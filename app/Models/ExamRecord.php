<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'exam_id',
        'user_id',   // The student's ID
        'note',
        'comment',
        'author_id', // The grader's ID
    ];

    protected function casts(): array
    {
        return [
            'note' => 'float',
        ];
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
