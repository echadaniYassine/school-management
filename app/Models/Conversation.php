<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function participants()
    {
        return $this->belongsToMany(User::class)->withPivot('read_at');
    }

    public function messages()
    {
        // Change this to 'asc' for correct chat log display
        return $this->hasMany(Message::class)->orderBy('created_at', 'asc');
    }

    public function lastMessage()
    {
        // This still works perfectly to get the latest message
        return $this->hasOne(Message::class)->latest();
    }
}