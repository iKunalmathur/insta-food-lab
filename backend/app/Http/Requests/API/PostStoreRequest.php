<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class PostStoreRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'price_and_quantity' => ['sometimes', 'string'],
            'location' => ['sometimes', 'string'],
            'tags' => ['sometimes', 'string'],
            'rating' => ['sometimes', 'numeric'],
            'is_comment_disabled' => ['sometimes', 'boolean'],
            'images' => ['required', 'array', 'min:1', 'max:4'],
            'images.*' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}
