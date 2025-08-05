<?php

namespace App\Models;

use App\Enums\UserRole; // You would create this Enum
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'admin', 'teacher', 'student', 'parent'
        'preferred_language', // 'ar', 'fr' - for UI preference
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'last_login_at',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date:Y-m-d',
            'last_login_at' => 'datetime',
            'role' => UserRole::class, // Using an Enum is clean and reliable
        ];
    }

    // NEW: Relationship for parents/guardians and their children
    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guardian_student', 'student_id', 'guardian_id');
    }

    public function children(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guardian_student', 'guardian_id', 'student_id');
    }

    // NEW: Student enrollments into specific classrooms
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    // Relationships for content creation (standardized)
    public function createdCourses(): HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function gradedExamRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'grader_id');
    }
}
