import { createContext, useEffect, useState } from 'react';
import { verifyAuthUser } from '../actions/users';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    verifyAuthUser()
      .then((retrievedUser) => {
        setUser(retrievedUser);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading && <h1>Loading...</h1>}
      {!loading && <>{children}</>}
    </AuthContext.Provider>
  );
};
