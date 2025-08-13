import { useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { mockUsers } from '../utils/mockData';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null
  });

  useEffect(() => {
    // Check for stored auth state
    const storedAuth = localStorage.getItem('socialMedia_auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuthState(parsedAuth);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      const newAuthState = {
        isAuthenticated: true,
        currentUser: user
      };
      setAuthState(newAuthState);
      localStorage.setItem('socialMedia_auth', JSON.stringify(newAuthState));
      return true;
    }
    return false;
  };

  const signup = (userData: Omit<User, 'id' | 'followers' | 'following' | 'posts' | 'joinedDate'>): boolean => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      followers: 0,
      following: 0,
      posts: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    const newAuthState = {
      isAuthenticated: true,
      currentUser: newUser
    };
    
    setAuthState(newAuthState);
    localStorage.setItem('socialMedia_auth', JSON.stringify(newAuthState));
    return true;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      currentUser: null
    });
    localStorage.removeItem('socialMedia_auth');
  };

  return { authState, login, signup, logout };
};