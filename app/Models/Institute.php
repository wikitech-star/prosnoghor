<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    // fillable
    protected $fillable = ['teacher_id', 'name', 'devision', 'zila', 'upozila', 'phone', 'address'];
}
