<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Classroom extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'code',
        'grade_id',
        'school_year_id',
        'main_teacher_id',
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
