import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기화 로직
    const user = JSON.parse(localStorage.getItem('loginUser'));
    if (user) {
      setLoginUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user.username?.toLowerCase() === 'admin');
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
    setIsLoading(false); // 여기서만 false!
  }, []);

  const login = (userData) => {
    localStorage.setItem('loginUser', JSON.stringify(userData));
    setLoginUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.username?.toLowerCase() === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('loginUser');
    setLoginUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ loginUser, isLoggedIn, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);