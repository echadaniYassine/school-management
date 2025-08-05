<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $examRecord = $this->route('exam_record');
        // Only the original grader can update the record.
        return $user->id === $examRecord->grader_id;
    }
    public function rules(): array
    {
        return [
            // You can only update the score and comment.
            'score' => 'sometimes|required|numeric|min:0|max:20',
            'comment' => 'sometimes|nullable|string|max:1000',
        ];
    }
}
