<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
        'role',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'last_login_at', // FIXED: 'last_login_date' changed to match migration
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date:Y-m-d',
            'last_login_at' => 'datetime', // FIXED: 'last_login_date' changed to match migration
            'role' => UserRole::class,
        ];
    }

    // ADDED: Relationships to content created by the user for a complete model definition.
    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class, 'author_id');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class, 'author_id');
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }

    public function createdExams(): HasMany
    {
        return $this->hasMany(Exam::class, 'author_id');
    }

    public function gradedExamRecords(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'author_id');
    }

    public function examRecordsAsStudent(): HasMany
    {
        return $this->hasMany(ExamRecord::class, 'user_id');
    }
    /**
     * This is the method the ChatController needs.
     * It checks if the user's role (which is an Enum object) matches the
     * given role string.
     *
     * @param string $roleName The role to check (e.g., 'teacher', 'admin').
     * @return bool
     */
    public function hasRole(string $roleName): bool
    {
        // $this->role is an instance of the UserRole Enum.
        // We compare its value to the provided string.
        return $this->role->value === $roleName;
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class)->withTimestamps();
    }
}
