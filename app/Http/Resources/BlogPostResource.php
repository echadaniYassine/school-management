<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'status' => $this->status,
            'category' => $this->category,
            'tags' => $this->tags ?? [],
            'featuredImageUrl' => $this->featured_image ? Storage::url($this->featured_image) : null,
            'publishedAt' => $this->published_at?->toIso8601String(),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),

            // Use the new `author` relationship. The old string 'author' field should be removed.
            'author' => new UserResource($this->whenLoaded('author')),
        ];
    }
}