<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'title',
        'description',
        'course_id', // Use this
        'due_date',
        'status',
        'assigned_to_description',
        'instructions_file_path',
        'created_by_id',
    ];

    protected $casts = [
        'due_date' => 'date:Y-m-d',
        'assigned_to_ids' => 'array', // If you use a JSON field for IDs
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    // If you link to a courses table:
    // public function courseModel()
    // {
    //     return $this->belongsTo(Course::class, 'course_id');
    // }

    // You might also want a relationship to a 'Submissions' model later
    // public function submissions()
    // {
    //     return $this->hasMany(Submission::class);
    // }

}
