<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'qualifications' => $this->qualifications,
            'department' => $this->department,
            'dateOfBirth' => $this->date_of_birth,
            'gender' => $this->gender,
            'address' => $this->address,
        ];
    }
}