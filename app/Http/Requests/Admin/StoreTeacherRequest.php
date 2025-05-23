<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Add admin authorization logic
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:100|unique:teachers,email',
            'password' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols(), 'max:30'],
            'date_of_birth' => 'required|date_format:Y-m-d',
            'gender' => 'required|in:male,female',
            'address' => 'nullable|string|max:255',
            'phone' => 'required|string|max:20|unique:teachers,phone',
        ];
    }
}
