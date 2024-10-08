import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chatx_user_data")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    
    authUser ? true : false
  );

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
