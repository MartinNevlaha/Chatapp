import { useEffect } from "react";
import socketClient from "socket.io-client";

import * as action from "../store/actions";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    const socket = socketClient.connect("http://localhost:8000");

    socket.emit("join", user);
    
    socket.on("onlineUsers", (onlineUsers) =>
      dispatch(action.friendsOnline(onlineUsers))
    );
  

    socket.on("offline", (user) => console.log(user, "goes to offline"));

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

export default useSocket;
