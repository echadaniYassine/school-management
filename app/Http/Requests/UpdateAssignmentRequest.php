<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $assignment = $this->route('assignment');
        // Only the teacher of the course this assignment belongs to can edit it.
        return $user->id === $assignment->course->teacher_id;
    }
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'due_date' => 'sometimes|required|date|after:now',
            'file_path' => 'sometimes|nullable|string',
        ];
    }
}
