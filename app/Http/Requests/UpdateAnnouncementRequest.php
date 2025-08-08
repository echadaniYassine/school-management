<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnouncementRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        // The announcement is available via route-model binding.
        $announcement = $this->route('announcement');

        // Admins can edit any announcement. Teachers can only edit their own.
        return $user->role->value === 'admin' ||
            ($user->role->value === 'teacher' && $announcement->author_id === $user->id);
    }
    public function rules(): array
    {
        return [
            // 'sometimes' means only validate if the field is present in the request. Perfect for PATCH.
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'published_at' => 'sometimes|nullable|date',
        ];
    }
}
