import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../socketContext";
import * as storage from "../storage";

const token = storage.getToken();
const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const initialSoket = io(disbookApiUrl, {
  extraHeaders: { authorization: `Bearer ${token}` },
});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(initialSoket);

  useEffect(() => {
    initialSoket.close();

    const newSocket = io(disbookApiUrl, {
      extraHeaders: { authorization: `Bearer ${token}` },
    });
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;