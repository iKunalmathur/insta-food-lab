<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class LikeStoreRequest extends FormRequest
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
            'model' => ['required', 'string', 'in:App\Models\Post,App\Models\Comment'],
            'is_liked' => ['required', 'boolean', 'min:0', 'max:1'],
        ];
    }
}