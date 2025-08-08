<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:subjects,name',
        ];
    }
}
