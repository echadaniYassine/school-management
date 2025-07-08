<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('course'));
    }
    
    public function rules(): array
    {
        $courseId = $this->route('course')->id;

        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            // 'code' => ['nullable', 'string', 'max:50', Rule::unique('courses', 'code')->ignore($courseId)],
            'description' => ['nullable', 'string'],
            'instructor' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            // 'level' => ['nullable', 'string', Rule::in(['Beginner', 'Intermediate', 'Advanced', 'All Levels'])],
            // 'duration' => ['nullable', 'string', 'max:100'],
            // 'status' => ['sometimes', 'required', Rule::in(['draft', 'published', 'archived'])],
            'thumbnail_url' => ['nullable', 'url', 'max:2048'],
            // 'price' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}