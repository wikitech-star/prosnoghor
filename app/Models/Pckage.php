<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pckage extends Model
{
    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('price', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('details', 'like', '%' . $filters['search'] . '%');
        }
    }

    protected $casts = [
        'classes' => 'array',
        'subjects' => 'array'
    ];

    public function groupClasses()
    {
        $ids = $this->classes;

        if (is_string($ids)) {
            $ids = json_decode($ids, true);
        }

        if (!is_array($ids) || empty($ids)) {
            return collect();
        }

        return GroupClass::whereIn('id', $ids)->get();
    }

    public function allSubjects()
    {
        $ids = $this->subjects;

        if (is_string($ids)) {
            $ids = json_decode($ids, true);
        }

        if (!is_array($ids) || empty($ids)) {
            return collect();
        }

        return Subject::whereIn('id', $ids)->get();
    }
}
