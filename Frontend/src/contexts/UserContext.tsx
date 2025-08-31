// src/contexts/UserContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';
const BACKEND_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

interface User {
  id: string;
  username: string;
  level?: number;
  fullname?: string;
  bio?: string;
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
  return {
    ...decoded.payload,
    level: decoded.payload.level || 1,   
  };
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
  const token = localStorage.getItem('token');

  const updateUserLevel = async (newLevel: number) => {
    console.log(user)
    console.log(token)
    console.log({ level: newLevel })
    if (!user) return; // safety check

    try {
      await fetch(`${BACKEND_BASE_URL}/users/${user._id}/level`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ level: newLevel }),
      });

      // Update context immediately
      setUser(prev => prev ? { ...prev, level: newLevel } : null);
    } catch (err) {
      console.error(err.message);
    }
  };

   interface Profile {
        fullname: string;
        bio: string;
  }

  const updateUserProfile = async ( profile: Profile) => {
    console.log(user)
    console.log(token)
    console.log(profile)
    if (!user) return; // safety check

    try {
      await fetch(`${BACKEND_BASE_URL}/users/${user._id}/profile/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( profile ),
      });

      // Update context immediately
      setUser(prev => prev ? { ...prev, profile } : null);
    } catch (err) {
      console.error(err.message);
    }
  };
  // This is the user state and the setUser function that will update it!
  // This variable name isn't special; it's just convention to use `value`.
  const value = { user, setUser, updateUserLevel, updateUserProfile };

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

