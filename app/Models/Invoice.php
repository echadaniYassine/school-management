<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasTranslations; // ADD THIS

class Invoice extends Model
{
    use HasFactory, SoftDeletes, HasTranslations;

    protected $dates = ['deleted_at'];
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
    protected $translatable = ['title', 'description'];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
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
    public function scopeUnpaid($query)
    {
        return $query->where('status', 'unpaid');
    }
    public function getTotalPaidAttribute()
    {
        return $this->payments()->sum('amount_paid');
    }
    public function getRemainingBalanceAttribute()
    {
        return $this->amount - $this->total_paid;
    }
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
            ->where('status', '!=', 'paid');
    }
}
