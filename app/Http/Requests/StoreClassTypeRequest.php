<?php
namespace App\Http\Requests;

use App\Models\ClassType;
use Illuminate\Foundation\Http\FormRequest;

class StoreClassTypeRequest extends FormRequest 
{
    public function authorize(): bool 
    {
        return $this->user()->can('create', ClassType::class);
    }
    
    public function rules(): array 
    {
        return [
            'name' => 'required|string|max:255|unique:class_types,name',
            'code' => 'required|string|max:10|unique:class_types,code',
        ];
    }
}