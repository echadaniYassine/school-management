<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Only Admins can create invoices.
     */
    public function authorize(): bool
    {
        // We can use the 'admin' Gate we defined earlier.
        return $this->user()->can('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // student_id must be required, and must exist in the 'users' table...
            // ... AND that user's role must be 'student'.
            'student_id' => ['required', Rule::exists('users', 'id')->where('role', 'student')],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0.01', // Cannot be zero or negative
            'due_date' => 'required|date|after_or_equal:today',
        ];
    }
}
