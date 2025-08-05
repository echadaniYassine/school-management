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
            'titleFr' => $this->title_fr,
            'titleAr' => $this->title_ar,
            'contentFr' => $this->content_fr,
            'contentAr' => $this->content_ar,
            'publishedAt' => $this->published_at?->format('Y-m-d H:i'),
            'author' => new UserResource($this->whenLoaded('author')),
        ];
    }
}
