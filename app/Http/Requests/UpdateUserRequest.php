<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $userToUpdate = $this->route('user');
        // An Admin can update any user. A user can only update their own profile.
        return $this->user()->role->value === 'admin' || $this->user()->id === $userToUpdate->id;
    }
    public function rules(): array
    {
        $userToUpdateId = $this->route('user')->id;
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($userToUpdateId)],
            'password' => ['nullable', 'string', Password::defaults(), 'confirmed'], // 'nullable' is key for not forcing a password change
            'role' => ['sometimes', 'required', Rule::in(['admin', 'teacher', 'student', 'parent'])],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', Rule::in(['male', 'female', 'other'])],
            'address' => ['nullable', 'string', 'max:1000'],
            'phone' => ['nullable', 'string', 'max:25'],
        ];
    }
}
