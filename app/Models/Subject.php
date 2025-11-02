<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    // fillable
    protected $fillable = ['class_id', 'code', 'name'];

    // filtter
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('name', 'like', '%' . $filters['search'] . '%')
                ->orWhere('code', 'like', '%' . $filters['search'] . '%')
                ->orWhere('id', 'like', '%' . $filters['search'] . '%');
        }
    }

    // relation with class
    public function classes()
    {
        return $this->belongsTo(GroupClass::class, 'class_id');
    }
}
