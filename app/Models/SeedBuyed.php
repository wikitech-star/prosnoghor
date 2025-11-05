<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeedBuyed extends Model
{
    public function seed()
    {
        return $this->belongsTo(Sete::class, 'seed_id');
    }

    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }
    }
}
