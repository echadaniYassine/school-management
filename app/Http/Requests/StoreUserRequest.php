<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            // Base User Rules
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->mixedCase()->numbers()],
            'role' => ['required', Rule::in(['admin', 'teacher', 'student', 'parent'])],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users,phone'],

            // Profile Data
            'profile' => ['nullable', 'array'],

            // Student Profile Rules
            'profile.student_id_number' => ['required_if:role,student', 'nullable', 'string', 'unique:student_profiles,student_id_number'],
            'profile.parent_id' => ['required_if:role,student', 'nullable', 'exists:users,id'],
            'profile.date_of_birth' => ['required_if:role,student,teacher', 'nullable', 'date'],
            'profile.gender' => ['required_if:role,student,teacher', 'nullable', Rule::in(['male', 'female'])],
            'profile.address' => ['required_if:role,student,teacher', 'nullable', 'string', 'max:255'],

            // Teacher Profile Rules
            'profile.qualifications' => ['required_if:role,teacher', 'nullable', 'string', 'max:255'],
        ];
    }
}
