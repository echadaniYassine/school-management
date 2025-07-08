// src/components/ChatPanel.jsx

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- MOCK DATA ---
// In a real app, this would be fetched from an API.
const initialConversations = [
  {
    id: 1,
    name: 'Mr. David Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
    lastMessage: 'Sounds good, thank you for the update!',
    timestamp: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 1, text: 'Hello, I wanted to check on the progress of the science fair project.', sender: 'them', timestamp: '10:40 AM' },
      { id: 2, text: 'We are on track. The final report will be ready by Friday.', sender: 'me', timestamp: '10:41 AM' },
      { id: 3, text: 'Sounds good, thank you for the update!', sender: 'them', timestamp: '10:42 AM' },
    ],
  },
  {
    id: 2,
    name: 'Admin Office',
    avatarUrl: null, // Will show fallback
    lastMessage: 'Reminder: All staff meeting tomorrow at 9 AM.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 1, text: 'Reminder: All staff meeting tomorrow at 9 AM.', sender: 'them', timestamp: 'Yesterday' },
    ],
  },
];

const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default function ChatPanel() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef(null);

  const totalUnread = conversations.reduce((sum, convo) => sum + convo.unreadCount, 0);
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Auto-scroll to the bottom when a new message appears
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [activeConversation?.messages.length]);

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    // Mark messages as read when opening a conversation
    setConversations(convos => 
      convos.map(c => c.id === id ? { ...c, unreadCount: 0 } : c)
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(convos =>
      convos.map(c => 
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMessage, timestamp: newMsg.timestamp }
          : c
      )
    );
    setNewMessage('');
  };

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

      <SheetContent className="flex flex-col p-0">
        {!activeConversation ? (
          <>
            <SheetHeader className="p-4">
              <SheetTitle>Recent Chats</SheetTitle>
            </SheetHeader>
            <Separator />
            <ScrollArea className="flex-1">
              {conversations.map(convo => (
                <div key={convo.id}>
                  <button
                    onClick={() => handleSelectConversation(convo.id)}
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
                      msg.sender === 'me'
                        ? 'bg-primary text-primary-foreground self-end'
                        : 'bg-muted self-start'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'} self-end`}>{msg.timestamp}</p>
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
                <Button type="submit" size="icon">
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