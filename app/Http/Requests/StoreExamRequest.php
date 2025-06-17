<?php
namespace App\Http\Requests;

use App\Models\Exam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Exam::class);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => ['required', Rule::in(['CC', 'EFF'])],
            'course_id' => 'required|exists:courses,id',
            'team_id' => 'required|exists:teams,id',
        ];
    }
}