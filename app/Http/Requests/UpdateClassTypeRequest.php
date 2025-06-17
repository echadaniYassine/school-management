<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClassTypeRequest extends FormRequest 
{
    public function authorize(): bool 
    {
        return $this->user()->can('update', $this->route('class_type'));
    }

    public function rules(): array 
    {
        $classTypeId = $this->route('class_type')->id;
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('class_types')->ignore($classTypeId)],
            'code' => ['sometimes', 'required', 'string', 'max:10', Rule::unique('class_types')->ignore($classTypeId)],
        ];
    }
}