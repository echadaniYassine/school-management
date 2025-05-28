<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'date' => $this->date->format('Y-m-d'), // Ensure consistent date format
            'location' => $this->location,
            'capacity' => $this->capacity,
            'status' => $this->status,
            // 'category' => $this->category,
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
            // Optional: 'creatorName' => $this->whenLoaded('creator', fn() => $this->creator->name),
        ];
    }
}