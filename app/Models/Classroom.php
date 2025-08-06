<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classroom extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'name', // e.g., "Classe A", "Classe B"
        'grade_id', // Links to a Grade level (e.g., "6ème Année Primaire")
        'school_year_id', // Links to an academic year (e.g., "2024-2025")
        'main_teacher_id', // The primary homeroom teacher
    ];

    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function mainTeacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'main_teacher_id');
    }

    // NEW: The courses taught in this classroom
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    // NEW: The students enrolled in this classroom
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }
}
