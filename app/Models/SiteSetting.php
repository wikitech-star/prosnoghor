<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    // fillable
    protected $fillable = [
        'site_name',
        'site_logo',
        'site_favicon',
        'meta_description',
        'meta_keywords',
        'site_email',
        'site_phone',
        'site_address',
        'social_links',
        'google_map',
        'maintenance_mode',
        'maintenance_message',
    ];
}
