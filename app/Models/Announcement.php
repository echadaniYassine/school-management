<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'title_ar',
        'title_fr',
        'content_ar',
        'content_fr',
        'published_at',
        // You can add 'target_role' (e.g., 'parents', 'teachers') or 'target_grade_id'
    ];
    
    protected $casts = ['published_at' => 'datetime'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}