import { useEffect } from "react";
import socketClient from "socket.io-client";

const useSocket = (userId, dispatch) => {
  useEffect(() => {
    const socket = socketClient.connect("http://localhost:8000");

    socket.emit("join", userId);

    socket.on("onlineUsers", (onlineUsers) => console.log(onlineUsers));

    socket.on("offline", user => console.log(user))

  }, [dispatch]);
};

export default useSocket;