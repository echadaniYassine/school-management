<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateActivityRequest extends FormRequest
{
    public function authorize()
    {
        return true; // For now, allow
    }

    public function rules()
    {
        // Often similar to StoreRequest, but 'required' might change
        // or you might allow partial updates (use 'sometimes' rule prefix)
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date_format:Y-m-d', // 'after_or_equal' might not be needed for updates if old dates are allowed
            'location' => 'sometimes|required|string|max:255',
            'capacity' => 'sometimes|required|integer|min:1',
            'status' => ['sometimes', 'required', 'string', Rule::in(['active', 'draft', 'cancelled'])],
            'category' => ['sometimes', 'required', 'string', Rule::in(['academic', 'sports', 'cultural', 'social'])],
        ];
    }
}