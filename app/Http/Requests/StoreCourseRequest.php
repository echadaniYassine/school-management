<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only Admins can create and assign courses.
        return $this->user()->role->value === 'admin';
    }
    public function rules(): array
    {
        return [
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => [
                'required',
                'exists:subjects,id',
                // This subject cannot already be assigned to this classroom for the current year.
                Rule::unique('courses')->where(function ($query) {
                    return $query->where('classroom_id', $this->input('classroom_id'));
                }),
            ],
            'teacher_id' => ['required', Rule::exists('users', 'id')->where('role', 'teacher')],
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
        ];
    }
}
