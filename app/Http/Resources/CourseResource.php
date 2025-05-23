<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'code' => $this->code,
            'description' => $this->description,
            'instructor' => $this->instructor,
            'category' => $this->category,
            'level' => $this->level,
            'duration' => $this->duration,
            'status' => $this->status,
            'thumbnailUrl' => $this->thumbnail_url, // snake_case to camelCase for JS
            'price' => (float) $this->price, // Ensure price is a float
            'createdAt' => $this->created_at, //->toIso8601String(),
            'updatedAt' => $this->updated_at, //->toIso8601String(),
            // 'instructorInfo' => new UserResource($this->whenLoaded('instructorUser')), // Example if you have relationships
        ];
    }
}