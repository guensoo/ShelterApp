import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user.userId?.toLowerCase() === 'admin');
    } else {
      setIsLoggedIn(false);  // 없으면 반드시 false로 설정
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoginUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.userId?.toLowerCase() === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setLoginUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ loginUser, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
