<?php

namespace App\Http\Requests;

use App\Models\Exam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExamRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $exam = Exam::findOrFail($this->input('exam_id'));
        // The grader must be the teacher of the course the exam belongs to.
        return $user->id === $exam->course->teacher_id;
    }
    public function rules(): array
    {
        return [
            'exam_id' => 'required|exists:exams,id',
            'student_id' => [
                'required',
                Rule::exists('users', 'id')->where('role', 'student'),
                // Prevent duplicate grade entry for the same student in the same exam.
                Rule::unique('exam_records')->where(function ($query) {
                    return $query->where('exam_id', $this->input('exam_id'));
                }),
            ],
            // Grader ID is the authenticated user, set in the controller.
            'score' => 'required|numeric|min:0|max:20', // Moroccan grading scale
            'comment' => 'nullable|string|max:1000',
        ];
    }
}
