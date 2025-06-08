<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name, // Changed from title to match your migration
            'code' => $this->code,
            'description' => $this->description,
            'category' => $this->category,
            'thumbnailUrl' => $this->thumbnail_url ? Storage::url($this->thumbnail_url) : null,
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),

            // Use the new `teacher` relationship and reuse the UserResource
            'teacher' => new UserResource($this->whenLoaded('teacher')),
        ];
    }
}