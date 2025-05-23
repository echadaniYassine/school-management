<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; // For generating slugs

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'status',
        'category',
        'tags',
        'featured_image',
        'author',
        'author_id',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array', // Automatically cast JSON 'tags' to PHP array and vice-versa
        'published_at' => 'datetime',
    ];

    // Automatically generate slug from title if not provided
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
                // Ensure slug is unique
                $originalSlug = $post->slug;
                $count = 1;
                while (static::whereSlug($post->slug)->exists()) {
                    $post->slug = "{$originalSlug}-" . $count++;
                }
            }
            // If status is 'published' and published_at is not set, set it now
            if ($post->status === 'published' && empty($post->published_at)) {
                $post->published_at = now();
            }
        });

        static::updating(function ($post) {
            // If status changes to 'published' and published_at is not set, set it now
            if ($post->isDirty('status') && $post->status === 'published' && empty($post->published_at)) {
                $post->published_at = now();
            }
            // If title is updated, regenerate slug if it's not manually set
            if ($post->isDirty('title') && !$post->isDirty('slug')) {
                 $post->slug = Str::slug($post->title);
                // Ensure slug is unique (excluding current model)
                $originalSlug = $post->slug;
                $count = 1;
                while (static::whereSlug($post->slug)->where('id', '!=', $post->id)->exists()) {
                    $post->slug = "{$originalSlug}-" . $count++;
                }
            }
        });
    }

    // Optional: Relationship to User model if author_id is used
    public function userAuthor()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

}