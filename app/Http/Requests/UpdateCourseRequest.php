<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only Admins can edit courses.
        return $this->user()->can('update', $this->route('course'));
    }
    public function rules(): array
    {
        $course = $this->route('course'); // Get the course being updated
        return [
            // You typically wouldn't change the classroom or subject, but you might change the teacher.
            'teacher_id' => ['sometimes', 'required', Rule::exists('users', 'id')->where('role', 'teacher')],
            'description' => 'sometimes|nullable|string',
        ];
    }
}
