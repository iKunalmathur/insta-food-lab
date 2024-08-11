<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'created_at' => $this->created_at->toDateTimeString(),
            'title' => $this->title,
            'description' => $this->description,
            'price_and_quantity' => $this->price_and_quantity,
            'location' => $this->location,
            'tags' => $this->tags,
            'rating' => $this->rating,
            'likes' => $this->likes->count(),
            'comments' => $this->comments,
            'is_archived' => $this->is_archived,
            'is_comment_disabled' => $this->is_comment_disabled,
            'is_already_liked' => $this->isAlreadyLiked(auth()->id()),
            'user' => UserResource::make($this->user),
            'images' => MediaResource::collection($this->getMedia('post_images')),
        ];
    }
}
