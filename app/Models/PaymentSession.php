<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSession extends Model
{
    protected $fillable = [
        'user_id',
        'uid',
        'method',
        'amount',
        'status',
        'admin_note',
        'data',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {
            $payment->uid = self::generateUid();
        });
    }

    protected static function generateUid()
    {
        do {
            $uid = str_pad(mt_rand(1000000000, 9999999999), 10, '0', STR_PAD_LEFT);
        } while (self::where('uid', $uid)->exists());

        return $uid;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
