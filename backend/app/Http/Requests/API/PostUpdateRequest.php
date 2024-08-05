<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $this->mergeIfMissing(config('settings.models.post.default', []));

        $this->merge([
            'is_archived' => $this->boolean('is_archived'),
            'is_comment_disabled' => $this->boolean('is_comment_disabled'),
        ]);

        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'price_and_quantity' => ['sometimes', 'string'],
            'location' => ['sometimes', 'string'],
            'tags' => ['sometimes', 'string'],
            'rating' => ['sometimes', 'numeric'],
            'is_archived' => ['sometimes', 'boolean'],
            'is_comment_disabled' => ['sometimes', 'boolean'],
        ];
    }
}
