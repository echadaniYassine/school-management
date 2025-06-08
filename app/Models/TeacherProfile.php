<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeacherProfile extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'user_id',
        'qualifications',
        'department',
        'date_of_birth',
        'gender',
        'address',
    ];

    /**
     * Get the main user record associated with this profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}