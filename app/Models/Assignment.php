<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Assignment extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'due_date',
        'file_path',
    ];

    protected $translatable = ['title', 'description'];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'due_date' => 'datetime',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function scopeDueSoon($query, $days = 3)
    {
        return $query->where('due_date', '<=', now()->addDays($days))
            ->where('due_date', '>=', now());
    }
}
