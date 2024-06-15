<?php

namespace App\Models;

use App\Trait\HasUser;
use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasUUID, HasUser;

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
        'tags' => 'array',
    ];

    public function comments()
    {
        return $this->morphMany(Comment::class, 'model', 'model_type', 'model_id');
    }
}
