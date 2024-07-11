import { AuthContext } from '../context';
import { useState, useEffect } from 'react';
import { fakeAuthProvider } from '../utils/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const signin = (user, callback) => {
    console.log('вы авторизованы');
    return fakeAuthProvider.signin(() => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.removeItem('user');
      callback();
    });
  };
  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
