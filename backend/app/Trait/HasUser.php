<?php

namespace App\Trait;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

trait HasUser
{
    public static function bootHasUser()
    {
        static::creating(function ($model) {
            if (empty($model->user_id)) {
                $model->user_id = Auth::id();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
