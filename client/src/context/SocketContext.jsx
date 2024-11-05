import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      return () => newSocket.close();
    } else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
}
