<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $featuredImageUrl = null;
        if ($this->featured_image) {
            $featuredImageUrl = Storage::disk('public')->url($this->featured_image);
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'status' => $this->status,
            'category' => $this->category,
            // 'tags' => $this->tags ?? [],
            'featuredImageUrl' => $featuredImageUrl, // Send the full URL
            'author' => new UserResource($this->whenLoaded('author')),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];
    }
}