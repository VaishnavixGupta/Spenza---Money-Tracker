import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../utils/getCurrentUser';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedUser = getCurrentUser();
    setUser(decodedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};