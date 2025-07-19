<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// This is a default channel that comes with Laravel
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


// ADD YOUR NEW CHANNEL AUTHORIZATION LOGIC HERE
Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    // This callback checks if the logged-in user is part of the conversation
    // they are attempting to listen to. If it returns true, they are authorized.
    // If it returns false, they are denied access to the channel.
    return $user->conversations()->where('id', $conversationId)->exists();
});