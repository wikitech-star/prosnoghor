<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CqAnswers extends Model
{
    // filable
    protected $fillable = ['question_id', 'questions', 'ans'];

    public function question()
    {
        return $this->belongsTo(Questions::class, 'question_id');
    }
}
