<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'note' => (float) $this->note,
            'comment' => $this->comment,
            'exam' => new ExamResource($this->whenLoaded('exam')),
            'student' => new UserResource($this->whenLoaded('student')),
            'grader' => new UserResource($this->whenLoaded('author')), // 'author' is the grader
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];
    }
}