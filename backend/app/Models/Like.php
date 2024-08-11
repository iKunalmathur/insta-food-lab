<?php

namespace App\Models;

use App\Trait\HasUser;
use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use HasFactory, HasUser, HasUUID, SoftDeletes;

    protected $fillable = [
        'user_id',
        'model_id',
        'model_type',
        'is_liked'
    ];

    protected $casts = [
        'is_liked' => 'boolean',
    ];
}
