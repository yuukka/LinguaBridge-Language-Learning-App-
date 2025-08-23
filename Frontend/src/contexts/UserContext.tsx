// src/contexts/UserContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
}

interface DecodedToken {
  payload: User;
  iat: number;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
// Add the new getUserFromToken function
const getUserFromToken = (): User | null => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  // return JSON.parse(atob(token.split('.')[1])).payload;
  const decoded = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
  return decoded.payload;
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


function UserProvider({ children }: { children: ReactNode }) {
  // call getUserFromToken() to get our initial user state
  const [user, setUser] = useState<User | null>(getUserFromToken());

  // This is the user state and the setUser function that will update it!
  // This variable name isn't special; it's just convention to use `value`.
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {/* The data we pass to the value prop above is now available to */}
      {/* all the children of the UserProvider component. */}
      {children}
    </UserContext.Provider>
  );
};

// When components need to use the value of the user context, they will need
// access to the UserContext object to know which context to access.
// Therefore, we export it here.
export { UserProvider, UserContext, useUser };

