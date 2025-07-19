<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Appends the 'sender_id' attribute when the model is serialized.
     */
    protected $appends = ['sender_id'];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Accessor to create a 'sender_id' attribute on the fly.
     * This ensures the frontend always receives the field it expects.
     * The attribute name will be converted to camelCase (senderId) in JSON responses.
     *
     * @return int
     */
    public function getSenderIdAttribute(): int
    {
        return $this->user_id;
    }
}