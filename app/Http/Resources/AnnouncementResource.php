<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'publishedAt' => $this->published_at?->format('Y-m-d H:i'),
            'author' => new UserResource($this->whenLoaded('author')),
        ];
    }
}
