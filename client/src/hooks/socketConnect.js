import { useEffect } from "react";
import socketClient from "socket.io-client";

import * as action from "../store/actions";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    const socket = socketClient.connect("http://localhost:8000", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(action.setSocket(socket));

    socket.emit("join", user);

    socket.on("onlineUsers", (onlineUsers) =>
      dispatch(action.friendsOnline(onlineUsers))
    );

    socket.on("offline", (user) => dispatch(action.friendOffline(user)));

    socket.on("receiveMessage", msg => dispatch(action.receiveMessage(msg)));

    socket.on("connect_error", (err) => {
      console.log(err);
    })

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

export default useSocket;
