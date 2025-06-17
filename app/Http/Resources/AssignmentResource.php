<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'course' => $this->course,
            'dueDate' => $this->due_date->format('Y-m-d'),
            'status' => $this->status,
            'assignedTo' => $this->assigned_to_description,
            'hasInstructionsFile' => !empty($this->instructions_file_path),
            'author' => new UserResource($this->whenLoaded('author')),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];
    }
}