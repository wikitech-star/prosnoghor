<?php

namespace App\Http\Controllers\Shared\Questions;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Institute;
use App\Models\Lassion;
use App\Models\Subject;
use App\Models\QuestionPaper;
use App\Models\Questions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuestionsController extends Controller
{
    // index
    public function index()
    {
        // class
        $group_class = GroupClass::pluck('name', 'id')->toArray();
        $group_class_ides = array_keys($group_class);

        // subjects
        $subjects = Subject::whereIn('class_id', $group_class_ides)->select('name', 'class_id', 'id')->get();
        $subjects_ides = Subject::whereIn('class_id', $group_class_ides)
            ->pluck('id')
            ->toArray();

        // lession
        $lassion = Lassion::whereIn('class_id', $group_class_ides)
            ->whereIn('subject_id', $subjects_ides)
            ->select('name', 'class_id', 'subject_id', 'id')->get();

        return Inertia::render('Shared/Questions/Index', [
            'group_class' => $group_class,
            'subjects' => $subjects,
            'lassion' => $lassion,
        ]);
    }

    // create new paper
    public function store_paper(Request $request)
    {
        $request->validate([
            'program_name' => 'required',
            'class_id' => 'required',
            'subjects' => 'required|array',
            'lassions' => 'required|array',
            'types' => 'required',
        ], [
            'program_name.required' => 'প্রোগ্রাম নাম প্রদান করুন',
            'class_id.required' => 'শ্রেনী বাছায় করুন',
            'subjects.required' => 'বিষয় বাছায় করুন',
            'lassions.required' => 'অধ্যায় বাছায় করুন',
            'types.required' => 'প্রশ্নের ধরন বাছায় করুন',
        ]);
        try {

            // create a new paper
            $q = new QuestionPaper();
            $q->created_id = Auth::id();
            $q->program_name = $request->program_name;
            $q->class_id = $request->class_id;
            $q->subjects = json_encode($request->subjects);
            $q->lession = json_encode($request->lassions);
            $q->type = $request->types;
            $q->save();

            return redirect()->route('g.load.questions', ['id' => $q->id]);
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // load questions
    public function load_questions(Request $request, $id)
    {
        // query
        $query = $request->only('type', 'search', 'taqs');

        // paper data
        $paperData =  QuestionPaper::findOrFail($id);

        // make type
        // Determine question types
        $newTypes = $paperData->type === 'all'
            ? ['mcq', 'cq', 'sq']
            : [$paperData->type];

        // question
        $dataquery = Questions::query()
            ->whereIn('type', $newTypes)
            ->where('class_id', $paperData->class_id)
            ->whereIn('subject_id', json_decode($paperData->subjects, true))
            ->whereIn('lesson_id', json_decode($paperData->lession, true));

        // optional filters
        if (isset($query['type']) && in_array($query['type'], ['mcq', 'cq', 'sq'])) {
            $dataquery->where('type', $query['type']);
        }
        if (!empty($query['search'])) {
            $dataquery->where('body', 'like', '%' . $query['search'] . '%');
        }
        if (!empty($query['taqs'])) {
            $dataquery->whereJsonContains('meta->taq', $query['taqs']);
        }

        // 1️⃣ প্রথমে full collection (no pagination) → unique taq বের করার জন্য
        $allItems = $dataquery->with(['group_class', 'subject', 'lession', 'topics', 'createdby', 'updatedby'])
            ->get()
            ->map(function ($q) {
                if ($q->type === 'mcq') {
                    $q->setRelation('options', $q->mcqOptions);
                } elseif (in_array($q->type, ['cq', 'sq'])) {
                    $q->setRelation('options', $q->cqsqOptions);
                }
                return $q;
            });

        // 2️⃣ unique taq বের করা
        $uniqueTaqs = $allItems
            ->map(function ($item) {
                $meta = is_string($item->meta) ? json_decode($item->meta, true) : $item->meta;
                return $meta['taq'] ?? [];
            })
            ->flatten()
            ->unique()
            ->values();

        // 3️⃣ paginate করা ডেটা (main list)
        $data = $allItems->forPage(request('page', 1), 30)->values();
        $paginated = new \Illuminate\Pagination\LengthAwarePaginator(
            $data,
            $allItems->count(),
            30,
            request('page', 1),
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return Inertia::render('Shared/Questions/LoadQuestions', [
            'paper_data' => $paperData,
            'data' => $paginated,
            'taqs' => $uniqueTaqs,
            'filters' => $query,
            'old_added_questions' => $paperData->questions,
        ]);
    }

    // add paper items
    public function add_paper_items(Request $request)
    {
        try {
            if ($request->id == '' || !is_array($request->data)) {
                return redirect()->back()->with('error', 'সঠিক তথ্য প্রদান করুন।');
            }

            $q = QuestionPaper::find($request->id);
            if (!$q) {
                return redirect()->back()->with('error', 'প্রশ্নপত্র খুঁজে পাওয়া যায়নি।');
            }
            $q->questions = json_encode($request->data);
            $q->save();

            return redirect()->back()->with('success', 'প্রশ্নপত্রে প্রশ্ন যোগ করা হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // all questions paper
    public function all_papers(Request $request)
    {

        $classes = GroupClass::all();
        $tree = $classes->map(function ($class) {
            // Get subjects for this class
            $subjects = Subject::where('class_id', $class->id)->get();

            return [
                'id' => $class->id,
                'name' => $class->name,
                'subjects' => $subjects->map(function ($subject) use ($class) {
                    // Get lessons for this subject
                    $lessons = Lassion::where('subject_id', $subject->id)->get();

                    return [
                        'id' => $subject->id,
                        'name' => $subject->name,
                        'lessons' => $lessons->map(function ($lesson) use ($class, $subject) {
                            $papers = QuestionPaper::where('class_id', $class->id)
                                ->whereJsonContains('subjects', (int)$subject->id)
                                ->whereJsonContains('lession', (int)$lesson->id)
                                ->where('created_id', Auth::id())
                                ->get();

                            return [
                                'id' => $lesson->id,
                                'name' => $lesson->name,
                                'papers' => $papers->map(function ($paper) {
                                    return [
                                        'id' => $paper->id,
                                        'name' => $paper->program_name,
                                        'type' => $paper->type == 'all' ? 'একসাথে' : ($paper->type == 'cq' ? 'সৃজনশীল' : ($paper->type == 'mcq' ? 'বহুনির্বাচনী' : 'জ্ঞানমূলক'))
                                    ];
                                }),
                            ];
                        }),
                    ];
                }),
            ];
        });

        return Inertia::render('Shared/Questions/AllPapers', [
            'tree' => $tree,
        ]);
    }

    // update paper item
    public function updateQuestionPaper(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3'
        ]);

        try {
            $paper = QuestionPaper::findOrFail($request->id);
            $paper->program_name = $request->title;
            $paper->save();

            return redirect()->back()->with('success', 'পরিবর্তন সফল হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete question paper
    public function delete_question_paper($id)
    {
        try {
            QuestionPaper::findOrFail($id)->delete();
            return redirect()->back()->with('success', 'প্রশ্নপত্র সফলভাবে মুছে ফেলা হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // show paper details
    public function show_paper_details($id)
    {
        $paperData =  QuestionPaper::findOrFail($id);

        // classes
        $class_name = GroupClass::where('id', $paperData->class_id)->value('name');
        $subjects = Subject::whereIn('id', json_decode($paperData->subjects, true))
            ->pluck('name')
            ->toArray();
        $lessons = Lassion::whereIn('id', json_decode($paperData->lession, true))
            ->pluck('name')
            ->toArray();

        // questions
        $ids = json_decode($paperData->questions, true);
        $questions =  Questions::whereIn('id', $ids)
            ->with(['group_class', 'subject', 'lession', 'topics'])
            ->latest()
            ->paginate(count($ids))
            ->through(function ($q) {
                if ($q->type === 'mcq') {
                    $q->setRelation('options', $q->mcqOptions);
                } elseif (in_array($q->type, ['cq', 'sq'])) {
                    $q->setRelation('options', $q->cqsqOptions);
                };
                return $q;
            });

        // scholl
        $school = Institute::where('teacher_id', Auth::id())->pluck('name')->first();

        return Inertia::render('Shared/Questions/PaperDetails', [
            'paper_data' => $paperData,
            'class_name' => $class_name,
            'subjects' => $subjects,
            'lessons' => $lessons,
            'data' => $questions,
            'school' => $school
        ]);
    }
}
