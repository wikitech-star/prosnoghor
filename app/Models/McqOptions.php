<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class McqOptions extends Model
{
    // fillable
    protected $fillable = ['question_id', 'option_text', 'is_correct', 'type'];

    public function question()
    {
        return $this->belongsTo(Questions::class, 'question_id');
    }
}
