<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only an authenticated Admin can create new users.
        return $this->user()->role->value === 'admin';
    }
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
            'role' => ['required', Rule::in(['admin', 'teacher', 'student', 'parent'])],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', Rule::in(['male', 'female', 'other'])],
            'address' => ['nullable', 'string', 'max:1000'],
            'phone' => ['nullable', 'string', 'max:25'],
        ];
    }
}
