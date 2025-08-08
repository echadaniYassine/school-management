<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreClassroomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('admin');
    }

    public function rules(): array
    {
        return [
            'grade_id' => 'required|exists:grades,id',
            'school_year_id' => 'required|exists:school_years,id',
            'main_teacher_id' => [
                'nullable',
                Rule::exists('users', 'id')->where('role', 'teacher')
            ],
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:classrooms,code',
            'max_students' => 'integer|min:1|max:50',
        ];
    }
}