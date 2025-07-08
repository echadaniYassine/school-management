<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title', 
        'slug', 
        'content', 
        'status', 
        'category', 
        // 'tags', 
        'featured_image', 
        'author_id', // This name now matches the migration perfectly.
        'published_at'
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected $casts = [
        'tags' => 'array', 
        'published_at' => 'datetime'
    ];

    /**
     * The "booted" method of the model.
     * This contains excellent automation logic.
     */
    protected static function boot(): void
    {
        parent::boot();

        // Before a new post is created...
        static::creating(function (BlogPost $post) {
            // If no slug is provided, automatically create one from the title.
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
            // If the post is being published immediately, set the published_at date.
            if ($post->status === 'published' && empty($post->published_at)) {
                $post->published_at = now();
            }
        });

        // Before an existing post is updated...
        static::updating(function (BlogPost $post) {
            // If the status is changed to 'published' for the first time...
            if ($post->isDirty('status') && $post->status === 'published' && empty($post->published_at)) {
                // ...set the published_at date.
                $post->published_at = now();
            }
        });
    }

    /**
     * Get the user who authored the blog post.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}