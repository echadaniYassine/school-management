<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'examDate' => $this->exam_date->format('Y-m-d H:i'),
            'course' => new CourseResource($this->whenLoaded('course')),
        ];
    }
}
