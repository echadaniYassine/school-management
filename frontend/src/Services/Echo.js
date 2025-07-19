import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { axiosClient } from '../Api/axios'; // Your pre-configured axios

// We need to tell Pusher and Echo that we're using them.
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  /**
   * Here's the magic. We tell Echo to use our axiosClient for authorization.
   * When Echo tries to join a private channel, it will make a request to
   * Laravel's broadcast authentication endpoint. This custom authorizer ensures
   * that request uses our axios instance, which automatically includes the
   * 'Authorization: Bearer <token>' header.
   */
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axiosClient.post('/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name,
        })
        .then(response => {
          callback(false, response.data);
        })
        .catch(error => {
          callback(true, error);
        });
      },
    };
  },
});

export default echo;