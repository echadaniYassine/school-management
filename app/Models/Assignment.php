<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     * Refactored for clarity, bilingual support, and proper relationships.
     */
    protected $fillable = [
        'course_id', // This is the proper foreign key.
        'title_ar',
        'title_fr',
        'description_ar',
        'description_fr',
        'due_date',
        'file_path', // For uploading instruction sheets or templates.
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
        ];
    }

    /**
     * Get the course this assignment belongs to.
     * Through this relationship, you can access the teacher: $assignment->course->teacher
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
