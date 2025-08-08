<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGradeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }
    public function rules(): array
    {
        $gradeId = $this->route('grade')->id;
        return [
            'level_id' => 'sometimes|required|exists:levels,id',
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('grades')->ignore($gradeId)],
        ];
    }
}
