<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Subject extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $fillable = ['code', 'name', 'color', 'is_active'];

    protected $translatable = ['name'];

    protected $casts = [
        'name' => 'array',
        'is_active' => 'boolean',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
