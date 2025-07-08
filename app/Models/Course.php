<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * --- FIX: Added 'author_id' to make it mass-assignable. ---
     */
    protected $fillable = [
        'title',
        // 'code',
        'description',
        'instructor',
        'category',
        // 'level',
        // 'duration',
        // 'status',
        'thumbnail_url',
        // 'price',
        'author_id' // This is now consistent with other models.
    ];

    protected function casts(): array
    {
        return [
            // 'price' => 'decimal:2',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }
    
    public function classTypes(): BelongsToMany
    {
        return $this->belongsToMany(ClassType::class, 'class_type_courses')
            ->withPivot('coef')
            ->withTimestamps();
    }

    /**
     * --- FIX: Renamed relationship to 'author()' and specified the foreign key for clarity. ---
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}