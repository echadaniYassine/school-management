<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory, Notifiable, SoftDeletes; // <-- THIS IS THE CAUSE

    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'capacity',
        'status',
        'created_by_id', // Add this line
    ];

    protected $casts = [
        'date' => 'date:Y-m-d', // Ensure date is cast correctly
        'capacity' => 'integer',
    ];

    // Optional: Relationship to User model if created_by_id is used
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
