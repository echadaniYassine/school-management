<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description', 'date', 'location', 'capacity', 'status', 'author_id'];
    
    protected function casts(): array
    {
        return ['date' => 'date:Y-m-d', 'capacity' => 'integer'];
    }

    public function author(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}