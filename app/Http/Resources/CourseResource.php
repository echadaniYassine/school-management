<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'descriptionFr' => $this->description_fr,
            'descriptionAr' => $this->description_ar,
            'subject' => new SubjectResource($this->whenLoaded('subject')),
            'teacher' => new UserResource($this->whenLoaded('teacher')),
            'classroom' => new ClassroomResource($this->whenLoaded('classroom')),
        ];
    }
}
