<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Level extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     * Examples: 'Maternelle', 'Primaire', 'Collège', 'Lycée'
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_ar',
        'name_fr',
    ];

    /**
     * A Level has many grades (e.g., Primaire has 1st Grade, 2nd Grade, etc.).
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }
}
