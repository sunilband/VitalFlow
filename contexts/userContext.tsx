"use client";
import { createContext, useContext, ReactNode, useState } from "react";

// Create a context and export the Provider and Consumer
const UserContext = createContext<{
  user?: any;
  setUser: any;
}>({ setUser: () => {} });

// Define a custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Define a provider component to wrap your app with
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
