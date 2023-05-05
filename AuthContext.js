import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const session = await AsyncStorage.getItem('session');
      if (session) {
        setUser(JSON.parse(session));
      }
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const login = async (data) => {
    // Perform login API call here
    const sessionData = data;
    await AsyncStorage.setItem('session', JSON.stringify(sessionData));
    setUser(sessionData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
