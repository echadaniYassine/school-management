<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssignmentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Check if authenticated user is admin/teacher
    }

    public function rules()
    {
        // Match statuses with your frontend/backend definitions
        $validStatuses = ['draft', 'published', 'archived', 'grading', 'graded'];

        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'course' => 'nullable|string|max:255',
            // 'course_id' => 'nullable|exists:courses,id', // If using course_id
            'due_date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'status' => ['required', 'string', Rule::in($validStatuses)],
            'assigned_to_description' => 'nullable|string|max:500',
            // 'assigned_to_ids' => 'nullable|array', // If using JSON ids
            // 'assigned_to_ids.*' => 'integer|exists:users,id', // or exists:groups,id
            'instructions_file' => 'nullable|file|mimes:pdf,doc,docx,txt,zip|max:10240', // Max 10MB
        ];
    }
}