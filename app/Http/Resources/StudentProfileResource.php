<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'studentIdNumber' => $this->student_id_number,
            'dateOfBirth' => $this->date_of_birth,
            'gender' => $this->gender,
            'address' => $this->address,
            // Include parent information if it was loaded.
            // The parent is also a user, so we reuse UserResource!
            'parent' => new UserResource($this->whenLoaded('parent')),
        ];
    }
}