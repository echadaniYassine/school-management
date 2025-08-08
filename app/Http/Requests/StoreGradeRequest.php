<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGradeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        return [
            'level_id' => 'required|exists:levels,id',
            'name' => 'required|string|max:255|unique:grades,name',
        ];
    }
}
