<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Level extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $fillable = ['code', 'name', 'sort_order'];

    protected $translatable = ['name'];

    protected $casts = [
        'name' => 'array',
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class)->orderBy('sort_order');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
