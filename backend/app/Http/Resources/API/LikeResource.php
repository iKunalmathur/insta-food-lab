<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LikeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $response = [
            'uuid' => $this->uuid,
            'is_liked' => $this->is_liked,
            'created_at' => $this->created_at->toDateTimeString(),
            'user' => UserResource::make($this->user),
        ];

        if ($request['withModel'] === true) {
            $response['model'] = $this->model;
        }

        return $response;
    }
}
