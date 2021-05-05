import { useEffect } from "react";
import socketClient from "socket.io-client";
import { Howl } from "howler";

import config from "../config/app";
import * as action from "../store/actions";
import messageSound from "../assets/sounds/messagefx.mp3";

const messageFx = new Howl({
  src: [messageSound],
  preload: true,
  loop: false,
});

const useSocket = (user, dispatch, openChatId) => {
  useEffect(() => {
    const socket = socketClient.connect(config.wsConnection, {
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

    socket.on("receiveMessage", (msg) => {
      console.log(msg, openChatId);
      if (msg.chatId === openChatId) messageFx.play();
      dispatch(action.receiveMessage(msg));
    });

    socket.on("typing", (msg) => {
      dispatch(action.userTyping(msg.typing));
      setTimeout(() => {
        dispatch(action.userTyping(false));
      }, 2500);
    });

    socket.on("deleteChat", (chatId) =>
      dispatch(action.deleteChatSuccess(chatId))
    );

    socket.on("createNewChat", (chat) =>
      dispatch(action.addToChatSuccess(chat))
    );

    socket.on("friendCalling", (data) => {
      dispatch(action.callFrom(data));
    });

    socket.on("callRejected", (data) => {
      dispatch(action.callRejectedReceive());
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });

    return () => {
      socket.disconnect();
      messageFx.unload();
    };
  }, [dispatch, user, openChatId]);
};

export default useSocket;
