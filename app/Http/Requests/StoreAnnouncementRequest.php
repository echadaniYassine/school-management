<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only Admins and Teachers can create announcements.
        return in_array($this->user()->role->value, ['admin', 'teacher']);
    }
    public function rules(): array
    {
        return [
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'required|string',
            'published_at' => 'nullable|date',
        ];
    }
}
