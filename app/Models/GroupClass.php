<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupClass extends Model
{
    // fillable fields
    protected $fillable = [
        'name',
    ];

    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }
    }
}
