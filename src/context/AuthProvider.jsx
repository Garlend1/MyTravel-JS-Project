import { AuthContext } from '../context';
import { useState } from 'react';
import { fakeAuthProvider } from '../utils/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = (user, callback) => {
    console.log('вы авторизованы');
    return fakeAuthProvider.signin(() => {
      setUser(user);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };
  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
