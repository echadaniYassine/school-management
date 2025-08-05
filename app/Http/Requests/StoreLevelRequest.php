<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLevelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        return [
            'name_fr' => 'required|string|max:255|unique:levels,name_fr',
            'name_ar' => 'required|string|max:255|unique:levels,name_ar',
        ];
    }
}
