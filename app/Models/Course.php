<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'code',
        'description',
        'instructor',
        'category',
        'level',
        'duration',
        'status',
        'thumbnail_url',
        'price',
        // 'user_id', // If you add instructor relationship
        'category_id', // If you add category relationship
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Optional: Define relationships
    // public function instructorUser()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }

     public function courseCategory()
     {
         return $this->belongsTo(Category::class, 'category_id');
     }
}