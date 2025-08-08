<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\HasTranslations; // ADD THIS

class ExamRecord extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $fillable = [
        'exam_id',
        'student_id', 
        'score',
        'comment',
        'grader_id',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'float',
        ];
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function grader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'grader_id');
    }
}
