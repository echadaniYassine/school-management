<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title', 
        'description', 
        'date', 
        'location', 
        'capacity', 
        'status', 
        'author_id' // Must be fillable to be set during creation.
    ];
    
    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d', // Ensures this is always a Carbon date object.
            'capacity' => 'integer',
        ];
    }

    /**
     * Get the user who authored the activity.
     * This relationship is essential for the policy check.
     */
    public function author(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}