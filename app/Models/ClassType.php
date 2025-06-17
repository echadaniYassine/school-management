<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ClassType extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'code'];

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }
    // In App\Models\ClassType.php
    // ...
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'class_type_courses')
            ->withPivot('coef')
            ->withTimestamps();
    }

    // In App\Models\Course.php
    // ...
    public function classTypes(): BelongsToMany
    {
        return $this->belongsToMany(ClassType::class, 'class_type_courses')
            ->withPivot('coef')
            ->withTimestamps();
    }
}
