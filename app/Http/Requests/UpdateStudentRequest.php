<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use App\Models\StudentParent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
            'phone' => [
                'required',
                'regex:/^(0[5-7]\d{8}|\+212[5-7]\d{8})$/',
            ],
            'address' => 'required|string|max:255',

            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->student),
            ],
            // 'password' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'email.unique' => 'This email is already registered.',
            'phone.regex' => 'Invalid phone number format.',
        ];
    }
}
