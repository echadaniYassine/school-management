<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'invoice_id',
        'amount_paid',
        'payment_date',
        'payment_method', // e.g., 'Credit Card', 'Cash', 'Bank Transfer'
        'transaction_reference', // Optional: for online payment gateway reference
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount_paid' => 'decimal:2',
            'payment_date' => 'datetime',
        ];
    }

    /**
     * Get the invoice this payment is for.
     */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}