<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoogleAuth extends Model
{
    // fillable
    protected $fillable = ['client_id', 'client_secrate', 'status'];
}
