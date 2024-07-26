<?php

namespace App\Models;

use App\Trait\HasUser;
use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory, HasUUID, HasUser;

    protected $fillable = [
        'text',
        'model_id',
        'model_type',
        'user_id',
    ];

    public function model()
    {
        return $this->morphTo();
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'model', 'model_type', 'model_id');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'model', 'model_type', 'model_id');
    }

    public function isAlreadyLiked($user_id)
    {
        return $this->likes()->where('user_id', $user_id)->exists();
    }
}
