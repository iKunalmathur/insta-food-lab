<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($request['withModel'] === true) {
            return [
                'uuid' => $this->uuid,
                'text' => $this->text,
                'created_at' => $this->created_at->toDateTimeString(),
                'user' => UserResource::make($this->user),
                'model' => $this->model,
            ];
        } else {
            return [
                'uuid' => $this->uuid,
                'text' => $this->text,
                'created_at' => $this->created_at->toDateTimeString(),
                'user' => UserResource::make($this->user),
            ];
        }
    }
}
