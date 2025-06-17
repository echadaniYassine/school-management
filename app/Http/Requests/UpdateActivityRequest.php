<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('activity'));
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date_format:Y-m-d',
            'location' => 'sometimes|required|string|max:255',
            'capacity' => 'sometimes|required|integer|min:1',
            'status' => ['sometimes', 'required', 'string', Rule::in(['active', 'draft', 'cancelled'])],
        ];
    }
}