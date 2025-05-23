<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Add admin authorization logic
    }

    public function rules(): array
    {
        $teacherId = $this->route('teacher')->id;

        return [
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:100', Rule::unique('teachers')->ignore($teacherId)],
            'password' => ['nullable', 'string', Password::min(8)->mixedCase()->numbers()->symbols(), 'max:30'],
            'date_of_birth' => 'sometimes|required|date_format:Y-m-d',
            'gender' => 'sometimes|required|in:male,female',
            'address' => 'nullable|string|max:255',
            'phone' => ['sometimes', 'required', 'string', 'max:20', Rule::unique('teachers')->ignore($teacherId)],
        ];
    }
}
