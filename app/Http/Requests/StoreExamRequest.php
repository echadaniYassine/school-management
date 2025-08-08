<?php

namespace App\Http\Requests;

use App\Models\Course;
use Illuminate\Foundation\Http\FormRequest;

class StoreExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        $course = Course::find($this->input('course_id'));
        // The user must be the teacher of the course to create an exam for it.
        return $course && $this->user()->id === $course->teacher_id;
    }
    public function rules(): array
    {
        return [
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:Quiz,Midterm,Final',
            'exam_date' => 'required|date|after:now',
        ];
    }
}
