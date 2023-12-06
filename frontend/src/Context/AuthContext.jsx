import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const login = (userData) => {
    setUser(userData);
    setUserName(userData.username);  // Set the username
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setUserName('');  // Clear the username
    setIsLoggedIn(false);
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
