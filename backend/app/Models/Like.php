<?php

namespace App\Models;

use App\Trait\HasUser;
use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory, HasUser, HasUUID;

    protected $fillable = [
        'user_id',
        'model_id',
        'model_type',
        'is_liked'
    ];
}
