<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'name',
        'code',
        'description',
        'category',
        'thumbnail_url',
        'teacher_id', // Add this to fillable
    ];

    /**
     * Get the teacher (user) who teaches this course.
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Get all the exams associated with this course.
     */
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}