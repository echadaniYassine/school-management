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

    protected $fillable = [
        'course_id',
        'name',
        'type',
        'exam_date',
        'duration_minutes',
    ];

    protected $translatable = ['name'];

    protected $casts = [
        'name' => 'array',
        'exam_date' => 'datetime',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function classroom(): \Illuminate\Database\Eloquent\Relations\HasOneThrough
    {
        return $this->hasOneThrough(Classroom::class, Course::class, 'id', 'id', 'course_id', 'classroom_id');
    }

    public function examRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class);
    }
    public function scopeUpcoming($query)
    {
        return $query->where('exam_date', '>', now())
            ->where('status', 'scheduled');
    }
}
