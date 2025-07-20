// src/components/Chat/ChatPanel.jsx

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';

// UI component imports
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from "@/components/ui/skeleton";

// Context and Hook imports
import { useUserContext } from '@/context/UserContext'; // Make sure this path is correct
import { useChat } from '@/hooks/useChat'; // Make sure this path is correct

// A simple loading skeleton for the conversation list
const ChatSkeleton = () => (
  <div className="p-4 space-y-4">
    {[...Array(3)].map((_, i) => (
      <div className="flex items-center space-x-4" key={i}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    ))}
  </div>
);

const getInitials = (name = '') => name?.split(' ').map(n => n[0]).join('').toUpperCase() || '';

export default function ChatPanel() {
  const { user, authenticated, isLoading: isAuthLoading } = useUserContext();

  const {
    loading: isChatLoading,
    error,
    conversations,
    activeConversation,
    totalUnread,
    selectConversation,
    sendMessage,
    setActiveConversationId,
  } = useChat(user); // Pass the authenticated user to the hook

  const [newMessage, setNewMessage] = useState('');
  const scrollViewportRef = useRef(null);

  // Effect to auto-scroll to the bottom of the chat
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [activeConversation?.messages?.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  // Don't render if user is not logged in.
  if (!authenticated) {
    return null;
  }

  const isLoading = isAuthLoading || isChatLoading;

  return (
    <Sheet>
      <SheetTrigger asChild>
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

      <SheetContent className="flex flex-col p-0 w-full sm:w-[400px] sm:max-w-[400px]">
        {!activeConversation ? (
          <>
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Recent Chats</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1">
              {isLoading && <ChatSkeleton />}
              {error && <div className="p-4 text-red-500">{error}</div>}
              {!isLoading && !error && conversations.map(convo => (
                <div key={convo.id}>
                  <button
                    onClick={() => selectConversation(convo.id)}
                    className="w-full text-left flex items-start gap-4 p-4 hover:bg-muted"
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
                        <span className="mt-1 inline-block h-4 min-w-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-4">
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
            <ScrollArea className="flex-1 bg-muted/30 p-4" viewportRef={scrollViewportRef}>
              <div className="flex flex-col gap-4">
                {activeConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[75%] p-2 px-3 rounded-lg ${
                      // This logic is now reliable because `msg.senderId` is consistent.
                      msg.senderId === user.id
                        ? 'bg-primary text-primary-foreground self-end'
                        : 'bg-background border self-start'
                    }`}
                  >
                    {/* This logic is now reliable because `msg.text` is consistent. */}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'} self-end`}>
                      {/* This logic is now reliable because `msg.timestamp` is consistent. */}
                      {msg.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
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