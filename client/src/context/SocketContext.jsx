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
  const BACKEND_URL ="https://chathub.up.railway.app"

  useEffect(() => {
    if (authUser) {
      const newSocket = io(BACKEND_URL, {
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
