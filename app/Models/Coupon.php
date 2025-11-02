<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('code', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('value', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('usages', 'like', '%' . $filters['search'] . '%');
        }
    }
}
