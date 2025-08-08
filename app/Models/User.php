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
use App\Traits\HasTranslations; // ADD THIS

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasTranslations;

    protected $fillable = [
        'name',
        'email',
        'preferred_language',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'is_active',

    ];

    protected $hidden = ['password', 'remember_token'];
    protected $guarded = ['id', 'role'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date:Y-m-d',
            'last_login_at' => 'datetime',
            'role' => UserRole::class,
            'is_active' => 'boolean',

        ];
    }
    protected $table = 'users';

    protected $dates = ['date_of_birth', 'last_login_at', 'deleted_at'];

    public function getFullNameAttribute(): string
    {
        return $this->name;
    }


    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guardian_student', 'student_id', 'guardian_id');
    }

    public function children(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guardian_student', 'guardian_id', 'student_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    public function createdCourses(): HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function gradedExamRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'grader_id');
    }
    public function studentExamRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'student_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'student_id');
    }
    public function assignments(): HasManyThrough
    {
        return $this->hasManyThrough(Assignment::class, Course::class);
    }

    public function managedClassrooms()
    {
        return $this->hasMany(Classroom::class, 'main_teacher_id');
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class, 'author_id');
    }



    // Scopes
    public function scopeRole($query, $role)
    {
        return $query->where('role', $role);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Add to User model

    public function hasRole(UserRole|string $role): bool
    {
        if ($this->role instanceof UserRole) {
            $roleValue = is_string($role) ? $role : $role->value;
            return $this->role->value === $roleValue;
        }
        return $this->role === $role;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    public function isTeacher(): bool
    {
        return $this->hasRole('teacher');
    }

    public function isStudent(): bool
    {
        return $this->hasRole('student');
    }

    public function isParent(): bool
    {
        return $this->hasRole('parent');
    }

    // Improve the courses relationship for students
    public function enrolledCourses(): HasManyThrough
    {
        return $this->hasManyThrough(
            Course::class,
            Enrollment::class,
            'student_id',
            'classroom_id',
            'id',
            'classroom_id'
        );
    }
}
