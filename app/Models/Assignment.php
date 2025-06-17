<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    use HasFactory;

    // FIXED: Standardized on 'author_id'.
    protected $fillable = [
        'title',
        'description',
        'course',
        'due_date',
        'status',
        'instructions_file_path',
        'assigned_to_description',
        'author_id'
    ];
    
    protected function casts(): array
    {
        return ['due_date' => 'date:Y-m-d'];
    }

    // FIXED: Renamed relationship to 'author' for consistency.
    public function author(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}