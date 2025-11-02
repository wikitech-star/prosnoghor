<?php

namespace App\Http\Controllers\Backend\Question;

use App\Http\Controllers\Controller;
use App\Models\CqAnswers;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\McqOptions;
use App\Models\Question_type;
use App\Models\Questions;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuestionController extends Controller
{
    // all ====================
    public function index(Request $request)
    {
        $query = $request->only('search', 'type', 'stype', 'cid', 'sid', 'lid', 'tid');

        // question
        $dataquery = Questions::query();
        $dataquery->when($request->query('type'), function ($q, $type) {
            $q->where('type', $type);
        });
        $dataquery->when($request->query('stype'), function ($q, $type) {
            $q->where('mcq_type', $type);
        });
        $dataquery->when($request->query('cid'), function ($q, $type) {
            $q->where('class_id', $type);
        });
        $dataquery->when($request->query('sid'), function ($q, $type) {
            $q->where('subject_id', $type);
        });
        $dataquery->when($request->query('lid'), function ($q, $type) {
            $q->where('lesson_id', $type);
        });
        $dataquery->when($request->query('tid'), function ($q, $type) {
            $q->where('q_type_id', $type);
        });
        $data = $dataquery->with(['group_class', 'subject', 'lession', 'topics', 'createdby', 'updatedby'])
            ->latest()
            ->orderBy('type')
            ->filter($request->only('search'))
            ->paginate(10)
            ->through(function ($q) {
                if ($q->type === 'mcq') {
                    $q->setRelation('options', $q->mcqOptions);
                } elseif (in_array($q->type, ['cq', 'sq'])) {
                    $q->setRelation('options', $q->cqsqOptions);
                }
                return [
                    'id' => $q->id,
                    'class' => $q->group_class?->name,
                    'subject' => $q->subject?->name,
                    'lession' => $q->lession?->name,
                    'topics' => $q->topics?->name,
                    'created_by' => [
                        'name' => $q->createdby?->name,
                        'email' => $q->createdby?->email
                    ],
                    'updated_by' => [
                        'name' => $q->updatedby?->name,
                        'email' => $q->updatedby?->email
                    ],
                    'question_type' => $q->type,
                    'mcq_label' => $q?->mcq_type == 'normal' ? 'সাধারন' : 'উচ্চতার দক্ষতা',
                    'title' => $q?->title,
                    'body' => $q?->body,
                    'options' => $q->options->map(function ($opt) use ($q) {
                        if ($q->type === 'mcq') {
                            return [
                                'id' => $opt->id,
                                'text' => $opt->option_text,
                                'is_correct' => $opt->is_correct,
                                'type' => $opt->type
                            ];
                        }
                        if (in_array($q->type, ['cq', 'sq'])) {
                            return [
                                'id' => $opt->id,
                                'text' => $opt->questions,
                                'ans' => $opt->ans ?? null,
                            ];
                        }
                    }),
                    'meta' => $q->meta,
                    'created_at' => $q->created_at->format('d M, Y'),
                    'updated_at' => $q->updated_at->format('d M, Y'),
                ];
            });

        // filter data
        $subjects = Subject::when($request->query('cid'), function ($query, $classId) {
            $query->where('class_id', $classId);
        })
            ->pluck('name', 'id')
            ->toArray();

        $lassions = Lassion::when($request->query('cid'), function ($query, $classId) {
            $query->where('class_id', $classId);
        })
            ->when($request->query('sid'), function ($query, $sId) {
                $query->where('subject_id', $sId);
            })
            ->pluck('name', 'id')
            ->toArray();


        return Inertia::render('Backend/Question/Index', [
            'query' => $query,
            'data' => $data,
            'class' => GroupClass::pluck('name', 'id')->toArray(),
            'subject' => $subjects,
            'lassion' => $lassions,
            'topic' => Question_type::pluck('name', 'id')->toArray(),
        ]);
    }

    // add =================
    public function add_view(Request $request)
    {
        // update
        $editId = $request->query('editid');
        $update = null;
        if ($editId && !empty($editId)) {
            $dataquery = Questions::query();
            $update = $dataquery->find($editId);

            if ($update) {
                if ($update->type === 'mcq') {
                    $update->setRelation('options', $update->mcqOptions);
                } elseif (in_array($update->type, ['cq', 'sq'])) {
                    $update->setRelation('options', $update->cqsqOptions);
                }
            }
        }

        // subject
        $subject = Subject::select('name', 'class_id', 'id')->get();

        // lessin
        $lassion = Lassion::select('name', 'class_id', 'subject_id', 'id')->get();

        // type
        $questionTypes = Question_type::pluck('name', 'id')->toArray();

        return Inertia::render('Backend/Question/Add', [
            'class_data' => GroupClass::pluck('name', 'id')->toArray(),
            'question_type' => count($questionTypes) ? $questionTypes : null,
            'subject' => $subject,
            'lassion' => $lassion,
            'update' => $update
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'question_type' => "required",
            'question_label' => 'required_if:question_type,mcq',
            'class_id' => 'required',
            'subject_id' => 'required',
            'lassion_id' => 'required',
            'type_id' => 'required',

            'image' => 'nullable|image|mimes:png,jpg,webp,gif',
            'videoUrl' => 'nullable|url',

            'searchTtitle' => 'nullable',
            'questionTtitle' => 'required_if:question_type,cq'
        ], [
            'question_type.required' => 'প্রশ্নের ধরন নির্বাচন করুন।',
            'question_label.required_if' => 'MCQ ধরন নির্বাচন করুন।',
            'class_id.required' => 'শ্রেনী নির্বাচন করুন।',
            'subject_id.required' => 'বিষয় নির্বাচন করুন।',
            'lassion_id.required' => 'অধ্যায় নির্বাচন করুন।',
            'type_id.required' => 'টপিক নির্বাচন করুন।',

            'image.image' => 'সঠিক ইমেজ প্রদান করুন।',
            'image.mimes' => 'ইমেজ png,jpg,webp,gif গ্রহণযোগ।',
            'videoUrl.url' => 'সঠিক লিংক প্রদান করুন।',

            'questionTtitle.required_if' => 'উদ্দিপক প্রদান করুন।'
        ]);

        try {
            // validations ==============
            // check cq or sq any empty question
            if ($request->question_type == 'cq' || $request->question_type == 'sq') {
                if (empty($request->cqsqQuestion) || count($request->cqsqQuestion) <= 0) {
                    return redirect()->back()->with(
                        'error',
                        $request->question_type == 'cq'
                        ? 'CQ প্রশ্ন প্রদান করুন।'
                        : 'SQ প্রশ্ন প্রদান করুন।'
                    );
                }

                foreach ($request->cqsqQuestion as $question) {
                    // Check if question field is empty or missing
                    if (empty($question['question'])) {
                        return redirect()->back()->with(
                            'error',
                            $request->question_type == 'cq'
                            ? 'একটি CQ প্রশ্ন ফাঁকা রয়েছে।'
                            : 'একটি SQ প্রশ্ন ফাঁকা রয়েছে।'
                        );
                    }
                }
            }

            // mcq
            if ($request->question_type == 'mcq') {
                $rightIsOne = 0;
                // check normal
                if ($request->question_label == 'normal' || $request->question_label == 'hard') {
                    if (empty($request->mcqQuestion) || count($request->mcqQuestion) <= 0) {
                        return redirect()->back()->with(
                            'error',
                            'MCQ সাধারন প্রশ্ন প্রদান করুন.'
                        );
                    }
                    foreach ($request->mcqQuestion as $mnquestion) {
                        if (empty($mnquestion['value'])) {
                            return redirect()->back()->with(
                                'error',
                                'একটি MCQ সাধারন প্রশ্ন ফাঁকা রয়েছে।'
                            );
                        } else {
                            if ($request->question_label == 'normal' && $mnquestion['isRight']) {
                                $rightIsOne += 1;
                            }
                        }
                    }
                }

                // check hard
                if ($request->question_label == 'hard') {
                    if (empty($request->mcqQuestionhard) || count($request->mcqQuestionhard) <= 0) {
                        return redirect()->back()->with(
                            'error',
                            'MCQ উচ্চতার দক্ষতা প্রশ্ন প্রদান করুন.'
                        );
                    }
                    foreach ($request->mcqQuestionhard as $mhquestion) {
                        if (empty($mhquestion['value'])) {
                            return redirect()->back()->with(
                                'error',
                                'একটি MCQ উচ্চততার দক্ষতার প্রশ্ন ফাঁকা রয়েছে।'
                            );
                        } else {
                            if ($mhquestion['isRight']) {
                                $rightIsOne += 1;
                            }
                        }
                    }
                }

                if ($rightIsOne <= 0) {
                    return redirect()->back()->with(
                        'error',
                        'MCQ উত্তর বাছায় করুন.'
                    );
                }
            }

            // craete or update
            $q = $request->id ? Questions::find($request->id) : new Questions();
            $q->class_id = $request->class_id;
            $q->subject_id = $request->subject_id;
            $q->lesson_id = $request->lassion_id;
            $q->q_type_id = $request->type_id;

            $q->type = $request->question_type;
            if ($request->question_type == 'mcq') {
                $q->mcq_type = $request->question_label;
            }
            $q->title = $request->searchTtitle;
            $q->body = $request->questionTtitle;

            $q->youtube_url = $request->videoUrl;
            $q->image_align = $request->imagePosition;

            $q->meta = json_encode([
                'taq' => $request->tags,
                'start' => $request->start,
            ]);
            // image
            if ($request->hasFile('image')) {
                $favicon = $request->file('image');
                $imageName = 'qimage_' . time() . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $imageName);
                if ($q && $q->image && file_exists(public_path('uploads/' . $q->image))) {
                    unlink(public_path('uploads/' . $q->image));
                }
                $q->image = $imageName;
            }
            $q->created_by = Auth::id();
            $qsave = $q->save();

            // if mcq
            if ($qsave) {
                // mcq
                if ($request->question_type == 'mcq') {
                    // if update request delete option
                    if ($request->id) {
                        McqOptions::where('question_id', $request->id)->delete();
                    }
                    if ($request->question_label == 'normal' || $request->question_label == 'hard') {
                        foreach ($request->mcqQuestion as $mnquestion) {
                            $mq = new McqOptions();
                            $mq->question_id = $q->id;
                            $mq->option_text = $mnquestion['value'];
                            $mq->is_correct = $mnquestion['isRight'];
                            $mq->type = 'normal';
                            $mq->save();
                        }
                    }
                    if ($request->question_label == 'hard') {
                        foreach ($request->mcqQuestionhard as $mhquestion) {
                            $mq = new McqOptions();
                            $mq->question_id = $q->id;
                            $mq->option_text = $mhquestion['value'];
                            $mq->is_correct = $mhquestion['isRight'];
                            $mq->type = 'hard';
                            $mq->save();
                        }
                    }
                }

                // sq or cq
                if ($request->question_type == 'cq' || $request->question_type == 'sq') {
                    // if update request delete option
                    if ($request->id) {
                        CqAnswers::where('question_id', $request->id)->delete();
                    }
                    foreach ($request->cqsqQuestion as $question) {
                        $c = new CqAnswers();
                        $c->question_id = $q->id;
                        $c->questions = $question['question'];
                        $c->ans = $question['answer'];
                        $c->save();
                    }
                }
            }

            $statusMessage = $request->id ? 'প্রশ্ন পরিবর্তন সফল হয়ছে।' : 'নতুন প্রশ্ন তৈরি সফল হয়ছে।';
            if ($request->question_type == 'mcq') {
                $statusMessage = $request->id ? 'MCQ প্রশ্ন পরিবর্তন সফল হয়ছে।' : 'MCQ নতুন প্রশ্ন তৈরি সফল হয়ছে।';
            }
            if ($request->question_type == 'cq') {
                $statusMessage = $request->id ? 'CQ প্রশ্ন পরিবর্তন সফল হয়ছে।' : 'CQ নতুন প্রশ্ন তৈরি সফল হয়ছে।';
            }
            if ($request->question_type == 'sq') {
                $statusMessage = $request->id ? 'SQ প্রশ্ন পরিবর্তন সফল হয়ছে।' : 'SQ নতুন প্রশ্ন তৈরি সফল হয়ছে।';
            }

            if ($request->id) {
                return redirect()->route('ux.question.all')->with('success', $statusMessage);
            } else {
                return redirect()->back()->with('success', $statusMessage);
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }

    // delete
    public function distroy($id)
    {
        try {
            $find = Questions::find($id);
            if ($find && $find->image && file_exists(public_path('uploads/' . $find->image))) {
                unlink(public_path('uploads/' . $find->image));
            }
            $find->delete();

            return redirect()->back()->with('success', 'একটি প্রশ্ন সফল্ভাবে মুছে ফেলা হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }
}
