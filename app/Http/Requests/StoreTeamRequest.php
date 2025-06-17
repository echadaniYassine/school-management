<?php
namespace App\Http\Requests;

use App\Models\Team;
use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest 
{
    public function authorize(): bool 
    { 
        return $this->user()->can('create', Team::class);
    }
    
    public function rules(): array 
    {
        return [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:teams,code',
            'class_type_id' => 'required|exists:class_types,id',
        ];
    }
}