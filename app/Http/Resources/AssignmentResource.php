<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'dueDate' => $this->due_date->format('Y-m-d'),
            'status' => $this->status,
            'assignedToDescription' => $this->assigned_to_description,
            'hasInstructionsFile' => !empty($this->instructions_file_path),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),

            // Load the creator relationship, which is a User
            'creator' => new UserResource($this->whenLoaded('creator')),
            // Load the course relationship if it exists
            // 'course' => new CourseResource($this->whenLoaded('course')),
        ];
    }
}