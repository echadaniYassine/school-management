<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('assignment'));
    }

    public function rules(): array
    {
        $validStatuses = ['draft', 'published', 'archived', 'grading', 'graded'];
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'course' => 'nullable|string|max:255',
            'due_date' => 'sometimes|required|date_format:Y-m-d',
            'status' => ['sometimes', 'required', 'string', Rule::in($validStatuses)],
            'assigned_to_description' => 'nullable|string|max:500',
            'instructions_file' => 'nullable|file|mimes:pdf,doc,docx,txt,zip|max:10240',
            'instructions_file_remove' => 'nullable|boolean',
        ];
    }
    
    protected function prepareForValidation(): void
    {
        if ($this->has('instructions_file_remove')) {
            $this->merge([
                'instructions_file_remove' => filter_var($this->instructions_file_remove, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);
        }
    }
}