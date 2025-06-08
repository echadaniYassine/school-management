<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExamRecord extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'exam_id',
        'user_id', // The student's user_id
        'note',
        'comment',
    ];

    /**
     * Get the student (user) this record belongs to.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the exam this record is for.
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}