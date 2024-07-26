<?php

namespace App\Models;

use App\Models\Like;
use App\Trait\HasUser;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends BaseModel implements HasMedia
{
    use InteractsWithMedia, HasUser;

    protected $fillable = [
        'title',
        'description',
        'price_and_quantity',
        'location',
        'tags',
        'rating',
        'likes',
        'comments',
        'is_archived',
        'is_comment_disabled',
        'user_id',
    ];

    protected $casts = [
        'is_archived' => 'boolean',
        'is_comment_disabled' => 'boolean',
    ];

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
