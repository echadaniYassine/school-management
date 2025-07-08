// src/context/UserContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { UserApi } from '../Services/Api/UserApi';

const TOKEN_KEY = 'AUTH_TOKEN';

export const UserStateContext = createContext({
  user: null,
  token: null,
  authenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {}, // Add register to the context
  logout: async () => {},
});

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, _setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const authenticated = !!token;

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const { data } = await UserApi.getUser();
          setUser(data.data || data);
        } catch (error) {
          console.error("Token is invalid. Clearing session.", error);
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const response = await UserApi.login(email, password);
    const apiToken = response.data.token;
    if (apiToken) {
      // The only job of login/register is to set the token.
      // The useEffect above will handle fetching the user and updating state.
      setToken(apiToken);
    }
  };

  const register = async (values) => {
    const response = await UserApi.register(values);
    const apiToken = response.data.token;
    if (apiToken) {
      // Let the useEffect handle the rest, just like in login.
      setToken(apiToken);
    }
  };

  const logout = async () => {
    try {
      if (token) await UserApi.logout();
    } catch (error) {
      console.warn("API logout failed, but proceeding.", error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <UserStateContext.Provider
      value={{ user, token, authenticated, isLoading, login, logout, register }}
    >
      {children}
    </UserStateContext.Provider>
  );
}

export const useUserContext = () => useContext(UserStateContext);