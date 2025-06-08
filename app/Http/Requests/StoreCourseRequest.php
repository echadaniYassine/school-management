<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Add authorization logic here if needed, e.g., check admin role
        return true; // For now, allow anyone
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $courseId = $this->route('course')?->id; // Safely get course ID

        return [
            'name' => ['required', 'string', 'max:255'], // Renamed from 'title'
            'code' => ['nullable', 'string', 'max:50', Rule::unique('courses', 'code')->ignore($courseId)],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'level' => ['nullable', 'string', Rule::in(['Beginner', 'Intermediate', 'Advanced', 'All Levels'])],
            'duration' => ['nullable', 'string', 'max:100'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'thumbnail_url' => ['nullable', 'url', 'max:2048'],
            // 'teacher_id' => ['required', 'exists:users,id'],

        ];
    }
}
