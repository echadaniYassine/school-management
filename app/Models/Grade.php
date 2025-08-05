<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Examples: '1ère Année Primaire', 'Tronc Commun Scientifique'
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_ar',
        'name_fr',
        'level_id', // Foreign key to the Level model
    ];

    /**
     * Get the educational level that this grade belongs to (e.g., 'Primaire').
     */
    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    /**
     * Get all the classrooms at this grade level.
     */
    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class);
    }
}