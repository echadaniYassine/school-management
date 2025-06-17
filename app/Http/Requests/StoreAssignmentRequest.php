<?php
namespace App\Http\Requests;

use App\Models\Assignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Assignment::class);
    }

    public function rules(): array
    {
        $validStatuses = ['draft', 'published', 'archived', 'grading', 'graded'];
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'course' => 'nullable|string|max:255',
            'due_date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'status' => ['required', 'string', Rule::in($validStatuses)],
            'assigned_to_description' => 'nullable|string|max:500',
            'instructions_file' => 'nullable|file|mimes:pdf,doc,docx,txt,zip|max:10240', // Max 10MB
        ];
    }
}