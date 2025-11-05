<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscribePackage extends Model
{
    // packages
    public function packages()
    {
        return $this->belongsTo(Pckage::class, 'package_id');
    }
}
