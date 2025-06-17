<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeamRequest extends FormRequest 
{
    public function authorize(): bool 
    { 
        return $this->user()->can('update', $this->team);
    }
    
    public function rules(): array 
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'code' => ['sometimes', 'required', 'string', 'max:20', Rule::unique('teams')->ignore($this->team->id)],
            'class_type_id' => 'sometimes|required|exists:class_types,id',
        ];
    }
}