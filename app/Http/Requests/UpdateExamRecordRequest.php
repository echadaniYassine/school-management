<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('record'));
    }

    public function rules(): array
    {
        return [
            'note' => 'sometimes|required|numeric|min:0|max:100',
            'comment' => 'nullable|string|max:1000',
        ];
    }
}