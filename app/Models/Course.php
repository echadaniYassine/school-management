<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    // REFACTORED: Fields are streamlined and focused
    protected $fillable = [
        'classroom_id',     // The class where this course is taught
        'subject_id',       // The subject being taught (e.g., Mathematics)
        'teacher_id',       // The teacher responsible for this course
        'description_ar',   // Bilingual support
        'description_fr',
    ];

    public function classroom(): BelongsTo
    {
        return $this->belongsTo(Classroom::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    // A course has many assignments and exams
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }
}