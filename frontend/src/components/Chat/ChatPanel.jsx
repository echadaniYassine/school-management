import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';

// Your UI component imports
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from "@/components/ui/skeleton"; // Use a real skeleton component

// --- CONTEXT AND HOOK IMPORTS ---
import { useUserContext } from '@/context/UserContext'; // Correct path to your context
import { useChat } from '@/hooks/useChat'; // Correct path to your hook

const ChatSkeleton = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  </div>
);


const getInitials = (name = '') => name?.split(' ').map(n => n[0]).join('').toUpperCase() || '';

export default function ChatPanel() {
  // 1. Get user and authentication state from your real context
  const { user, authenticated, isLoading: isAuthLoading } = useUserContext();

  // 2. Pass the authenticated user to the useChat hook
  const {
    loading: isChatLoading,
    error,
    conversations,
    activeConversation,
    totalUnread,
    selectConversation,
    sendMessage,
    setActiveConversationId,
  } = useChat(user);

  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
    }
  }, [activeConversation?.messages?.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage('');
  };

  // Do not render the chat panel if the user is not authenticated.
  if (!authenticated) {
    return null;
  }

  // Display a loading state while auth or chat data is being fetched.
  const isLoading = isAuthLoading || isChatLoading;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* ... SheetTrigger content remains the same ... */}
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {totalUnread > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalUnread}
            </span>
          )}
          <span className="sr-only">Open chat</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col p-0">
        {!activeConversation ? (
          <>
            <SheetHeader className="p-4">
              <SheetTitle>Recent Chats</SheetTitle>
            </SheetHeader>
            <Separator />
            <ScrollArea className="flex-1">
              {isLoading && <ChatSkeleton />}
              {error && <div className="p-4 text-red-500">{error}</div>}
              {!isLoading && !error && conversations.map(convo => (
                // ... Conversation list item remains the same ...
                <div key={convo.id}>
                  <button
                    onClick={() => selectConversation(convo.id)}
                    className="w-full text-left flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <Avatar>
                      <AvatarImage src={convo.avatarUrl} />
                      <AvatarFallback>{getInitials(convo.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold truncate">{convo.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{convo.timestamp}</p>
                      {convo.unreadCount > 0 && (
                        <span className="mt-1 inline-block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] leading-4">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </>
        ) : (
          <>
            {/* ... Active conversation header remains the same ... */}
            <SheetHeader className="p-4 border-b">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="-ml-2" onClick={() => setActiveConversationId(null)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activeConversation.avatarUrl} />
                  <AvatarFallback>{getInitials(activeConversation.name)}</AvatarFallback>
                </Avatar>
                <SheetTitle className="text-base">{activeConversation.name}</SheetTitle>
              </div>
            </SheetHeader>
            <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4">
                {activeConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[75%] p-2 rounded-lg ${
                      // 3. Use the real user's ID to check message sender
                      msg.senderId === user.id
                        ? 'bg-primary text-primary-foreground self-end'
                        : 'bg-muted self-start'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'} self-end`}>
                      {msg.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            {/* ... Message input form remains the same ... */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}