<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // The authorization is handled by the controller's `authorizeResource` method.
        return true;
    }

    public function rules(): array
    {
        // Get the user we are trying to update from the route parameter.
        $userToUpdate = $this->route('user');

        return [
            // Base User Rules
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($userToUpdate->id)],
            'password' => ['nullable', 'string', 'confirmed', Password::min(8)],
            'role' => ['sometimes', 'required', Rule::in(['admin', 'teacher', 'student', 'parent'])],
            'phone' => ['sometimes', 'nullable', 'string', 'max:20', Rule::unique('users')->ignore($userToUpdate->id)],

            // Profile Data
            'profile' => ['sometimes', 'nullable', 'array'],

            // Student Profile Rules
            'profile.student_id_number' => ['sometimes', 'nullable', 'string', Rule::unique('student_profiles', 'student_id_number')->ignore($userToUpdate->studentProfile?->id)],
            'profile.parent_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'profile.date_of_birth' => ['sometimes', 'nullable', 'date'],
            'profile.gender' => ['sometimes', 'nullable', Rule::in(['male', 'female'])],
            'profile.address' => ['sometimes', 'nullable', 'string', 'max:255'],

            // Teacher Profile Rules
            'profile.qualifications' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}