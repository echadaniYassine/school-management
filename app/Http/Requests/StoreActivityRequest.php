<?php
namespace App\Http\Requests;

use App\Models\Activity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Activity::class);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => ['required', 'string', Rule::in(['active', 'draft', 'cancelled'])],
        ];
    }
}