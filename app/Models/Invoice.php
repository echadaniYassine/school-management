<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'title',        // e.g., "Frais de scolarité - Octobre 2024"
        'description',
        'amount',
        'due_date',
        'status',       // e.g., 'unpaid', 'paid', 'overdue'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'due_date' => 'date',
        ];
    }

    /**
     * Get the student this invoice is for.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get all payments made towards this invoice.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}