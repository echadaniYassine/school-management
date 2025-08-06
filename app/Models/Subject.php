<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     * Examples: 'Mathématiques', 'التربية الإسلامية'
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_ar',
        'name_fr',
    ];

    /**
     * Get the courses that teach this subject.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
