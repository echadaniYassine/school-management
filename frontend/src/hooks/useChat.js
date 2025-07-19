import { useState, useEffect, useCallback } from 'react';
import { ChatApi } from '../Services/Api/ChatApi'; 
import echo from '../Services/Echo';

export const useChat = (currentUser) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect for fetching initial data.
  // Thanks to the useMemo fix, this will now only run when the user logs in/out.
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const { data } = await ChatApi.getConversations();
        setConversations(data.conversations || []);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
        setError("Could not load your chats.");
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [currentUser]); // This dependency is now stable.

  // Effect for managing real-time listeners.
  useEffect(() => {
    if (conversations.length === 0) {
      return;
    }

    const handleNewMessage = (event) => {
      const newMessage = event.message;
      setConversations(prevConvos => 
        prevConvos.map(c => {
          if (c.id === newMessage.conversation_id) {
            // Use a functional update for `messages` to avoid stale state
            const updatedMessages = c.messages ? [...c.messages, newMessage] : [newMessage];
            return {
              ...c,
              messages: updatedMessages,
              lastMessage: newMessage.body,
              timestamp: new Date(newMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unreadCount: document.hidden || c.id !== activeConversationId ? (c.unreadCount || 0) + 1 : 0,
            };
          }
          return c;
        })
      );
    };

    conversations.forEach(convo => {
      echo.private(`conversation.${convo.id}`).listen('.NewMessageSent', handleNewMessage);
    });

    return () => {
      conversations.forEach(convo => {
        echo.leave(`conversation.${convo.id}`);
      });
    };
  }, [conversations, activeConversationId]); // Re-run only when the list of convos or the active one changes.

  // The rest of your hook (selectConversation, sendMessage, etc.) can remain the same.
  const selectConversation = useCallback((id) => {
      setActiveConversationId(id);
      setConversations(convos =>
        convos.map(c => (c.id === id ? { ...c, unreadCount: 0 } : c))
      );
      ChatApi.markAsRead(id);
  }, []);

  const sendMessage = useCallback(async (text) => {
      if (!text.trim() || !activeConversationId || !currentUser) return;
      const optimisticMessage = {
        id: Date.now(),
        text: text, 
        senderId: currentUser.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations(convos =>
        convos.map(c =>
          c.id === activeConversationId
            ? { ...c, messages: [...(c.messages || []), optimisticMessage], lastMessage: text }
            : c
        )
      );
      try {
        await ChatApi.sendMessage({ conversationId: activeConversationId, text });
      } catch (err) {
        console.error("Failed to send message:", err);
        setError("Failed to send message. Please try again.");
      }
  }, [activeConversationId, currentUser]);
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const totalUnread = conversations.reduce((sum, convo) => sum + (convo.unreadCount || 0), 0);

  return { loading, error, conversations, activeConversation, totalUnread, selectConversation, sendMessage, setActiveConversationId };
};