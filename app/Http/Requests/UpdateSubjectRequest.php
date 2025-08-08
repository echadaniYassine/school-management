<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        $subjectId = $this->route('subject')->id;
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('subjects')->ignore($subjectId)],
        ];
    }
}
