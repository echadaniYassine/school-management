<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentParentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:50',
            'date_of_birth' => 'required|date',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'address' => 'required|max:255',
            'phone' => 'required|max:13|unique:student_parents',
            'email' => 'required|email|unique:student_parents',
            'password' => 'required',

        ];
    }
}
