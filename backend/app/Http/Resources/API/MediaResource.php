<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'custom_properties' => $this->custom_properties,
            'extension' => $this->extension,
            'file_name' => $this->file_name,
            'name' => $this->name,
            'order' => $this->order,
            'original_url' => $this->original_url,
            'preview_url' => $this->preview_url,
            'size' => $this->size,
            'uuid' => $this->uuid,
        ];
    }
}
