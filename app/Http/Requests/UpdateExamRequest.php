<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        $exam = $this->route('exam');
        // The user must be the teacher of the course the exam belongs to.
        return $this->user()->id === $exam->course->teacher_id;
    }
    public function rules(): array
    {
        return [
            'name_fr' => 'sometimes|required|string|max:255',
            'name_ar' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|in:Quiz,Midterm,Final',
            'exam_date' => 'sometimes|required|date',
        ];
    }
}
