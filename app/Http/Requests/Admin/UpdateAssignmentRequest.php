<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssignmentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Check if authenticated user is admin/teacher
    }

    public function rules()
    {
        $validStatuses = ['draft', 'published', 'archived', 'grading', 'graded'];

        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'course' => 'nullable|string|max:255',
            // 'course_id' => 'nullable|exists:courses,id',
            'due_date' => 'sometimes|required|date_format:Y-m-d',
            'status' => ['sometimes', 'required', 'string', Rule::in($validStatuses)],
            'assigned_to_description' => 'nullable|string|max:500',
            // 'assigned_to_ids' => 'nullable|array',
            // 'assigned_to_ids.*' => 'integer|exists:users,id',
            'instructions_file' => 'nullable|file|mimes:pdf,doc,docx,txt,zip|max:10240',
            'instructions_file_remove' => 'nullable|boolean',
        ];
    }
     /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        if ($this->has('instructions_file_remove')) {
            $this->merge([
                'instructions_file_remove' => filter_var($this->instructions_file_remove, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);
        }
    }
}