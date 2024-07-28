<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => !empty($this->getFirstMediaUrl('avatars')) ? $this->getFirstMediaUrl('avatars')  : 'https://ui-avatars.com/api/?background=f66151&name=' . $this->name,
        ];
    }
}
