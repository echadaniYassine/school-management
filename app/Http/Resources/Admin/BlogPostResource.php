<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BlogPostResource extends JsonResource
{
    public function toArray($request)
    {
        $featuredImageUrl = null;
        if ($this->featured_image) {
            // Assuming 'public' disk. Adjust if using a different disk.
            $featuredImageUrl = Storage::disk('public')->url($this->featured_image);
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'status' => $this->status,
            'category' => $this->category,
            'tags' => $this->tags ?? [],
            'featuredImage' => $featuredImageUrl, // Send the full URL
            'author' => $this->author,
            // 'authorName' => $this->whenLoaded('userAuthor', fn() => $this->userAuthor?->name), // if using author_id and User model
            'publishedAt' => $this->published_at ? $this->published_at->toIso8601String() : null,
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];
    }
}