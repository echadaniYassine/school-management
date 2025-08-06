<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\UserRole; // You would create this Enum
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'preferred_language', // 'ar', 'fr' - for UI preference
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'last_login_at',
    ];

    protected $hidden = ['password', 'remember_token'];
    protected $guarded = ['id', 'role']; // Prevent mass assignment of critical fields

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
    // Add table name if different from convention
    protected $table = 'users';

    // Add date mutators
    protected $dates = ['date_of_birth', 'last_login_at', 'deleted_at'];

    // Add accessor for full name
    public function getFullNameAttribute(): string
    {
        return $this->name;
    }

    // Add scope for active users
    public function scopeActive($query)
    {
        return $query->whereNotNull('email_verified_at');
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
    // In User model, add:
    public function studentExamRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'student_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'student_id');
    }

    // In Subject model, consider adding:
    public function assignments(): HasManyThrough
    {
        return $this->hasManyThrough(Assignment::class, Course::class);
    }
}
