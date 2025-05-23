<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreActivityRequest extends FormRequest
{
    public function authorize()
    {
        // Add your authorization logic, e.g., check if user is an admin
        return true; // For now, allow
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => ['required', 'string', Rule::in(['active', 'draft', 'cancelled'])],
            'category' => ['required', 'string', Rule::in(['academic', 'sports', 'cultural', 'social'])],
        ];
    }
}