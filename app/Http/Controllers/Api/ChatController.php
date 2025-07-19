<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    /**
     * Fetch all conversations for the authenticated user.
     * This version is idempotent and fixes the infinite loop.
     */
    public function getConversations()
    {
        $user = Auth::user();

        // STEP 1: Get all other users for the "everyone can talk to everyone" test setup.
        $otherUsers = User::where('id', '!=', $user->id)->get();

        // STEP 2: Find existing 1-on-1 conversations in a single query.
        $existingConversations = $user->conversations()
            ->whereHas('participants', function ($query) use ($otherUsers) {
                $query->whereIn('user_id', $otherUsers->pluck('id'));
            })
            ->where(function ($query) {
                $query->has('participants', '=', 2);
            })
            ->get();

        // STEP 3: Figure out which users we still need to create a conversation with.
        $existingContactIds = $existingConversations->flatMap(function ($convo) use ($user) {
            return $convo->participants->where('id', '!=', $user->id)->pluck('id');
        });

        $newContactIds = $otherUsers->pluck('id')->diff($existingContactIds);

        // STEP 4: If there are new contacts, create the conversations and pivot table entries efficiently.
        if ($newContactIds->isNotEmpty()) {
            DB::transaction(function () use ($user, $newContactIds) {
                $newConversations = [];
                $newPivots = [];
                $now = now();

                foreach ($newContactIds as $contactId) {
                    $conversation = Conversation::create(['created_at' => $now, 'updated_at' => $now]);
                    $newPivots[] = ['user_id' => $user->id, 'conversation_id' => $conversation->id];
                    $newPivots[] = ['user_id' => $contactId, 'conversation_id' => $conversation->id];
                }
                // Insert all pivot table records in a single query.
                DB::table('conversation_user')->insert($newPivots);
            });
        }

        // STEP 5: Now that all conversations are guaranteed to exist, fetch and format them.
        $allConversations = $user->conversations()
            ->with(['participants' => function ($query) use ($user) {
                $query->where('users.id', '!=', $user->id);
            }, 'lastMessage.sender'])
            ->get();

        $formattedConversations = $allConversations->map(function ($convo) use ($user) {
            $otherParticipant = $convo->participants->first();
            if (!$otherParticipant) return null;

            $readAt = optional($convo->participants()->where('user_id', $user->id)->first()->pivot)->read_at;
            $unreadCount = $convo->messages()->where('user_id', '!=', $user->id)->when($readAt, fn($q) => $q->where('created_at', '>', $readAt))->count();

            return [
                'id' => $convo->id,
                'name' => $otherParticipant->name,
                'avatarUrl' => $otherParticipant->avatar_url,
                'lastMessage' => optional($convo->lastMessage)->body ?? 'No messages yet.',
                'timestamp' => optional(optional($convo->lastMessage)->created_at)->toTimeString() ?? $convo->created_at->toTimeString(),
                'unreadCount' => $unreadCount,
                'messages' => $convo->messages()->get(),
            ];
        })->filter();

        return response()->json(['conversations' => $formattedConversations]);
    }

    // The sendMessage and markAsRead methods are correct and do not need to be changed.
    public function sendMessage(Request $request)
    {
        // ... (no changes needed here)
        $request->validate(['conversationId' => 'required|exists:conversations,id', 'text' => 'required|string']);
        $user = Auth::user();
        $conversationId = $request->conversationId;
        $isParticipant = $user->conversations()->where('conversations.id', $conversationId)->exists();
        if (!$isParticipant) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $message = Message::create(['conversation_id' => $conversationId, 'user_id' => $user->id, 'body' => $request->text]);
        $message->load('sender');
        broadcast(new \App\Events\NewMessageSent($message))->toOthers();
        return response()->json(['message' => $message]);
    }

    public function markAsRead(Conversation $conversation)
    {
        // ... (no changes needed here)
        $user = Auth::user();
        $conversation->participants()->updateExistingPivot($user->id, ['read_at' => now()]);
        return response()->json(['status' => 'success']);
    }
}