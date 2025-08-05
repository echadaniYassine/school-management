<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     * Refactored to remove redundant fields and add bilingual support.
     */
    protected $fillable = [
        'course_id', // The only context needed.
        'name_ar',
        'name_fr',
        'type', // e.g., 'Quiz', 'Midterm', 'Final'. Good candidate for an Enum.
        'exam_date',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'exam_date' => 'datetime',
        ];
    }

    /**
     * Get the course this exam belongs to.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the classroom where this exam is taken, through the course.
     * This is a "Has One Through" relationship.
     */
    public function classroom(): \Illuminate\Database\Eloquent\Relations\HasOneThrough
    {
        return $this->hasOneThrough(Classroom::class, Course::class, 'id', 'id', 'course_id', 'classroom_id');
    }

    /**
     * Get all the records (student scores) for this exam.
     */
    public function examRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class);
    }
}
