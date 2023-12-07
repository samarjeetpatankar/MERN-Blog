import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
      setUserName(userData.username);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setUserName(userData.username);
    setIsLoggedIn(true);
    localStorage.setItem('userData', JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null);
    setUserName('');
    setIsLoggedIn(false);
    localStorage.removeItem('userData'); 
  };

  const contextValue = {
    user,
    isLoggedIn,
    userName,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

