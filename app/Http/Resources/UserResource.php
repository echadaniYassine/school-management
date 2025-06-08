<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'phone' => $this->phone,
            'avatarUrl' => $this->avatar_url ? Storage::url($this->avatar_url) : null,
            'lastLoginAt' => $this->last_login_at?->toIso8601String(),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),

            // This is a slightly cleaner way to conditionally include relationships.
            'studentProfile' => new StudentProfileResource($this->whenLoaded('studentProfile')),
            'teacherProfile' => new TeacherProfileResource($this->whenLoaded('teacherProfile')),
        ];
    }
}