<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'name',
        'type',
        'course_id',
        'class_id', // Renamed from team_id
        'teacher_id',
    ];

    /**
     * Get the course this exam belongs to.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the class this exam is for.
     */
    public function forClass()
    {
        return $this->belongsTo(Classe::class, 'class_id');
    }

    /**
     * Get the teacher (user) who created the exam.
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}