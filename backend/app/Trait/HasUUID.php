<?php

namespace App\Trait;

use Illuminate\Support\Str;

trait HasUUID
{

    public static function bootHasUUID()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
