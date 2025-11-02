<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lassion extends Model
{
    // fillable
    protected $fillable = ['class_id', 'subject_id', 'name'];


    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }
    }

    // relation with class
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
    public function classes()
    {
        return $this->belongsTo(GroupClass::class, 'class_id');
    }
}
