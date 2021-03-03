import { useEffect } from "react";
import socketClient from "socket.io-client";

const useSocket = (userId, dispatch) => {
  useEffect(() => {
    const socket = socketClient.connect("http://localhost:8000");

    socket.emit("join", userId);

  }, [dispatch])
}

export default useSocket;