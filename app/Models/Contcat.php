<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contcat extends Model
{

    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('phone', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('email', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('subject', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('message', 'like', '%' . $filters['search'] . '%');
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'auth_id');
    }
}
