// 1. Import your existing, pre-configured axios client.
//    Adjust the path if your file structure is different.
import { axiosClient } from '../../Api/axios';

// 2. Define the ChatApi service object.
//    Each property is a function that makes a specific API call.
export const ChatApi = {
  /**
   * Fetches all conversations for the currently authenticated user.
   * Your axios interceptor will automatically add the auth token.
   */
  getConversations: () => {
    // Makes a GET request to:
    // [your_base_url]/api/chat/conversations
    return axiosClient.get('/chat/conversations');
  },

  /**
   * Sends a new message to a specific conversation.
   * @param {object} messageData - The data for the new message.
   * @param {number|string} messageData.conversationId - The ID of the conversation.
   * @param {string} messageData.text - The content of the message.
   */
  sendMessage: (messageData) => {
    // Makes a POST request to:
    // [your_base_url]/api/chat/messages
    return axiosClient.post('/chat/messages', messageData);
  },

  /**
   * (Optional but recommended) Marks all messages in a conversation as read.
   * @param {number|string} conversationId - The ID of the conversation to mark as read.
   */
  markAsRead: (conversationId) => {
    // Makes a POST request to:
    // [your_base_url]/api/chat/conversations/{conversationId}/read
    return axiosClient.post(`/chat/conversations/${conversationId}/read`);
  },
};