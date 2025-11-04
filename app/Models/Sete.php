<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sete extends Model
{

    // filter scope
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && is_string($filters['search']) && $filters['search']) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('slug', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('price', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('selling_price', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('seo_taqs', 'like', '%' . $filters['search'] . '%');
            $query->orWhere('seo_description', 'like', '%' . $filters['search'] . '%');
        }
    }
}
