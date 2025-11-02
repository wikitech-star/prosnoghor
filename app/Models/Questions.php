<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    // fillable
    protected $fillable = ['class_id', 'subject_id', 'lesson_id', 'q_type_id', 'type', 'title', 'body', 'image', 'image_align', 'youtube_url', 'meta', 'requested_by', 'created_by', 'updated_by'];

    protected $hidden = ['mcqOptions', 'cqsqOptions'];


    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('title', 'like', '%' . $filters['search'] . '%')
                ->orWhere('body', 'like', '%' . $filters['search'] . '%')
                ->orWhere('type', $filters['search']);
        }
    }

    // relation
    public function mcqOptions()
    {
        return $this->hasMany(McqOptions::class, 'question_id');
    }
    public function cqsqOptions()
    {
        return $this->hasMany(CqAnswers::class, 'question_id');
    }

    public function getOptionsAttribute()
    {
        if ($this->type === 'mcq') {
            return $this->mcqOptions;
        }

        if (in_array($this->type, ['cq', 'sq'])) {
            return $this->cqsqOptions;
        }

        return collect();
    }

    public function group_class()
    {
        return $this->belongsTo(GroupClass::class, 'class_id');
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
    public function lession()
    {
        return $this->belongsTo(Lassion::class, 'lesson_id');
    }
    public function topics()
    {
        return $this->belongsTo(Question_type::class, 'q_type_id');
    }
    public function createdby()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedby()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function requestedby()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

}
