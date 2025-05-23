<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'message',
        'target_type',
        'target_value',
        'sent_by_id',
        'sent_by_name',
        'sent_at',
        'status',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    // Optional: Relationship to User model if sent_by_id is used
    public function sender()
    {
        return $this->belongsTo(User::class, 'sent_by_id');
    }
}