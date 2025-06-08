<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlogPost extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'title',
        'slug',
        'content',
        'status',
        'category',
        'tags',
        'featured_image',
        'author_id', // The correct foreign key
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
    ];

    // The boot method for slugs is good, no changes needed.
    protected static function boot() { /* ... your existing boot method ... */ }

    /**
     * Get the author (user) of the blog post.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}