<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Grade extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $fillable = ['level_id', 'code', 'name', 'sort_order'];

    protected $translatable = ['name'];

    protected $casts = [
        'name' => 'array',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function classrooms()
    {
        return $this->hasMany(Classroom::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
