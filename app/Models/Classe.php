<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classe extends Model // Note the name "Classe"
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'name',
        'teacher_id',
    ];

    /**
     * Get the teacher (user) responsible for this class.
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Get all the students (users) enrolled in this class.
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }
}