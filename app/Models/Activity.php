<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'capacity',
        'status',
        // 'category',
        // 'created_by_id',
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