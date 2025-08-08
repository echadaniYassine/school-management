<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLevelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        $levelId = $this->route('level')->id;
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('levels')->ignore($levelId)],
        ];
    }
}
