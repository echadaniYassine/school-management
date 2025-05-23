<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreNotificationRequest extends FormRequest
{
    public function authorize()
    {
        // Add your authorization logic, e.g., check if user is an admin
        // return Auth::check() && Auth::user()->isAdmin();
        return true; // For now, allow
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'target_type' => 'required|string|in:all_users,targeted_group,targeted_user,system_alert', // Match frontend options
            'target_value' => 'nullable|string|max:255', // e.g., group name, user ID, etc.
        ];
    }
}