<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitutNameRequest extends Model
{
    // teacher
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
