<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassroomResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'grade' => new GradeResource($this->whenLoaded('grade')),
            'mainTeacher' => new UserResource($this->whenLoaded('mainTeacher')),
            'students' => UserResource::collection($this->whenLoaded('students')),
            'courses' => CourseResource::collection($this->whenLoaded('courses')),
        ];
    }
}