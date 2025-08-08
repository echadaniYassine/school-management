<?php

namespace App\Http\Requests;

use App\Models\Course;
use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $course = Course::findOrFail($this->input('course_id'));
        // Only the teacher of the course can create an assignment for it.
        return $user->id === $course->teacher_id;
    }
    public function rules(): array
    {
        return [
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date|after:now',
            'file_path' => 'nullable|string', // Or 'file|mimes:pdf,docx|max:2048' if uploading files
        ];
    }
}
