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
            'dueDate' => $this->due_date->format('Y-m-d H:i'),
            'filePath' => $this->file_path,
            'course' => new CourseResource($this->whenLoaded('course')),
        ];
    }
}
