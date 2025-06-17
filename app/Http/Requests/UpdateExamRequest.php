<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->exam);
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'type' => ['sometimes', 'required', Rule::in(['CC', 'EFF'])],
            'course_id' => 'sometimes|required|exists:courses,id',
            'team_id' => 'sometimes|required|exists:teams,id',
        ];
    }
}