<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  // 2. "USE" THE TRAIT INSIDE THE CLASS
  // This line "mixes in" the tokens(), createToken(), and currentAccessToken() methods.

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'phone',
    'avatar_url',
    'last_login_at',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
    'last_login_at' => 'datetime',
  ];


  // --- ROLE-SPECIFIC PROFILE RELATIONSHIPS ---

  /**
   * Get the student-specific profile information.
   */
  public function studentProfile()
  {
    return $this->hasOne(StudentProfile::class);
  }

  /**
   * Get the teacher-specific profile information.
   */
  public function teacherProfile()
  {
    return $this->hasOne(TeacherProfile::class);
  }

  // --- ROLE CHECKS (for authorization and logic) ---

  public function isStudent(): bool
  {
    return $this->role === 'student';
  }
  public function isTeacher(): bool
  {
    return $this->role === 'teacher';
  }
  public function isAdmin(): bool
  {
    return $this->role === 'admin';
  }
  public function isParent(): bool
  {
    return $this->role === 'parent';
  }


  // --- RELATIONSHIPS WHERE THIS USER IS THE 'OWNER' ---

  /**
   * The courses this user teaches (if they are a teacher).
   */
  public function taughtCourses()
  {
    return $this->hasMany(Course::class, 'teacher_id');
  }

  /**
   * The classes this user manages (if they are a teacher).
   */
  public function managedClasses()
  {
    return $this->hasMany(Classe::class, 'teacher_id');
  }

  /**
   * The blog posts this user has written.
   */
  public function blogPosts()
  {
    return $this->hasMany(BlogPost::class, 'author_id');
  }


  // --- RELATIONSHIPS WHERE THIS USER IS A 'MEMBER' ---

  /**
   * The classes this user is enrolled in (if they are a student).
   */
  public function enrolledClasses()
  {
    // Use 'enrollments' as the pivot table name
    return $this->belongsToMany(Classe::class, 'enrollments');
  }

  /**
   * The children of this user (if they are a parent).
   */
  public function children()
  {
    return $this->hasManyThrough(User::class, StudentProfile::class, 'parent_id', 'id', 'id', 'user_id');
  }

  /**
   * The exam records for this user (if they are a student).
   */
  public function examRecords()
  {
    return $this->hasMany(ExamRecord::class);
  }

  /**
   * The chat conversations this user is a part of.
   */
  // public function conversations()
  // {
  //   return $this->belongsToMany(Conversation::class);
  // }
}
