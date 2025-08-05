<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamRecord extends Model
{
use HasFactory, SoftDeletes;

/**
* The attributes that are mass assignable.
*/
protected $fillable = [
'exam_id',
'student_id', // The student taking the exam.
'score', // Renamed 'note' to 'score' for better English clarity.
'comment',
'grader_id', // RENAMED from 'author_id' for clarity. This is the teacher who entered the grade.
];

/**
* Get the attributes that should be cast.
*/
protected function casts(): array
{
return [
'score' => 'float',
];
}

/**
* Get the exam this record is for.
*/
public function exam(): BelongsTo
{
return $this->belongsTo(Exam::class);
}

/**
* Get the student associated with this exam record.
*/
public function student(): BelongsTo
{
return $this->belongsTo(User::class, 'student_id');
}

/**
* Get the user (teacher) who graded the exam.
* RENAMED from 'author' for clarity.
*/
public function grader(): BelongsTo
{
return $this->belongsTo(User::class, 'grader_id');
}
}