<?php
namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\ExamRecord;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExamRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Pass the parent exam model to the policy check if needed for more complex rules
        return $this->user()->can('create', [ExamRecord::class, $this->route('exam')]);
    }

    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                Rule::exists('users', 'id')->where('role', UserRole::STUDENT)
            ],
            'note' => 'required|numeric|min:0|max:100', // Adjust max as needed
            'comment' => 'nullable|string|max:1000',
        ];
    }
}