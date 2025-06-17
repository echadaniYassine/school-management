<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    // REMOVED: 'category_id' as per instruction.
    protected $fillable = [
        'title', 'code', 'description', 'instructor', 'category', 'level',
        'duration', 'status', 'thumbnail_url', 'price',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
    
    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }
}