// src/hooks/useChat.js

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChatApi } from '../Services/Api/ChatApi'; // Make sure this path is correct
import echo from '../Services/Echo'; // Make sure this path is correct

/**
 * NORMALIZER FUNCTION
 * This is the key fix. It ensures that any message object, whether it comes
 * from the initial API load, a real-time event, or an optimistic update,
 * has the exact same structure for the UI to use.
 *
 * @param {object} msg - The raw message object.
 * @returns {object} A standardized message object.
 */
const normalizeMessage = (msg) => {
  if (!msg) return null;
  return {
    id: msg.id,
    // Backend sends `body`, our optimistic update uses `text`. This handles both.
    text: msg.body || msg.text,
    // Backend sends `user_id`, our optimistic update uses `senderId`.
    senderId: msg.user_id || msg.senderId,
    // Backend sends `created_at`, our optimistic update uses `timestamp`.
    timestamp: new Date(msg.created_at || msg.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    // The full sender object from the backend is preserved if it exists.
    sender: msg.sender,
  };
};


export const useChat = (currentUser) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // EFFECT 1: Fetch initial data only when the user logs in or out.
  useEffect(() => {
    // If there's no user, clear everything and stop.
    if (!currentUser) {
      setLoading(false);
      setConversations([]);
      return;
    }

    const fetchInitialConversations = async () => {
      try {
        setLoading(true);
        const { data } = await ChatApi.getConversations();
        
        // Normalize all messages for every conversation right after fetching.
        const normalizedConversations = (data.conversations || []).map(convo => ({
          ...convo,
          messages: (convo.messages || []).map(normalizeMessage),
        }));
        
        setConversations(normalizedConversations);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
        setError("Could not load your chats.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialConversations();
  }, [currentUser]); // This effect is stable and runs only on auth changes.

  // EFFECT 2: Manage real-time listeners efficiently.
  useEffect(() => {
    // Don't set up listeners if we have no user or conversations.
    if (!currentUser || conversations.length === 0) {
      return;
    }

    // The handler for new messages broadcasted by the server.
    const handleNewMessage = (event) => {
      // **THE FIX**: Normalize the incoming message so it matches our UI's needs.
      const newMessage = normalizeMessage(event.message);
      if (!newMessage) return;

      setConversations(prevConvos =>
        prevConvos.map(c => {
          if (c.id === event.message.conversation_id) {
            // Prevent adding duplicate messages that might arrive from an echo.
            if (c.messages.some(m => m.id === newMessage.id)) {
              return c;
            }
            
            const updatedMessages = [...c.messages, newMessage];
            const shouldIncrementUnread = document.hidden || c.id !== activeConversationId;
            
            return {
              ...c,
              messages: updatedMessages,
              lastMessage: newMessage.text,
              timestamp: newMessage.timestamp,
              unreadCount: shouldIncrementUnread ? (c.unreadCount || 0) + 1 : c.unreadCount,
            };
          }
          return c;
        })
      );
    };

    // Subscribe to each conversation's private channel.
    conversations.forEach(convo => {
      echo.private(`conversation.${convo.id}`)
          // **THE FIX**: Use 'NewMessageSent' without the leading dot.
          .listen('NewMessageSent', handleNewMessage);
    });

    // Cleanup function: Leave all channels when the component unmounts or dependencies change.
    return () => {
      conversations.forEach(convo => {
        echo.leave(`conversation.${convo.id}`);
      });
    };
    
  // This dependency array is optimized to re-run only when necessary.
  }, [conversations, currentUser, activeConversationId]);

  // ACTION: Select a conversation to view.
  const selectConversation = useCallback((id) => {
    setActiveConversationId(id);
    // When a conversation is selected, reset its unread count in the UI.
    setConversations(convos =>
      convos.map(c => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
    // Tell the backend that we've read the messages.
    ChatApi.markAsRead(id);
  }, []);

  // ACTION: Send a new message.
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !activeConversationId || !currentUser) return;
    
    // Create an optimistic message that is instantly added to the UI.
    // **THE FIX**: Use the normalizer here too for 100% consistency.
    const optimisticMessage = normalizeMessage({
      id: `optimistic-${Date.now()}`,
      text: text, // `text` is correct for the input
      senderId: currentUser.id, // `senderId` is correct for the context user
      timestamp: new Date().toISOString(), // `timestamp` is correct for a new date
    });

    // Update the UI immediately.
    setConversations(convos =>
      convos.map(c =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: [...c.messages, optimisticMessage],
              lastMessage: optimisticMessage.text,
            }
          : c
      )
    );

    try {
      // Send the actual API request. The broadcast event from the server will confirm the message.
      await ChatApi.sendMessage({ conversationId: activeConversationId, text });
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
      // If the API call fails, remove the optimistic message.
      setConversations(convos => 
        convos.map(c => ({
          ...c,
          messages: c.messages.filter(m => m.id !== optimisticMessage.id)
        }))
      );
    }
  }, [activeConversationId, currentUser]);
  
  // Memoized derived state to prevent unnecessary UI re-renders.
  const activeConversation = useMemo(
    () => conversations.find(c => c.id === activeConversationId),
    [conversations, activeConversationId]
  );

  const totalUnread = useMemo(
    () => conversations.reduce((sum, convo) => sum + (convo.unreadCount || 0), 0),
    [conversations]
  );

  return { loading, error, conversations, activeConversation, totalUnread, selectConversation, sendMessage, setActiveConversationId };
};