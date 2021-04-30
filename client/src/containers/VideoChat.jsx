import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";

import useSocket from "../hooks/socketConnect";
import * as action from "../store/actions";
import VideoChat from "../components/VideoChat/VideoChat";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.user);
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);
  const friends = useSelector((state) => state.friends.userFriends);
  const loadingFriends = useSelector((state) => state.friends.loading);
  const socket = useSelector((state) => state.chat.socket);
  const stream = useSelector((state) => state.videoCall.currentStream);
  const myVideo = useRef();
  const friendVideo = useRef();
  const connection = useRef();
  const userId = +user.id;

  useEffect(() => {
    dispatch(action.fetchChatData());
    dispatch(action.getUserFriends(userId));
  }, [dispatch, userId]);

  useSocket(user, dispatch);

  const handleDeleteChat = (chatId, deletedChat) => {
    dispatch(action.deleteChat(chatId, deletedChat));
  };

  const handleAddToChat = (friendId) => {
    const friendData = {
      friendId: friendId,
    };
    dispatch(action.addToChat(friendData));
  };

  const handleCallToFriend = (friendId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callToFriend", {
        friendId: friendId,
        signalData: data,
        fromUser: user,
      });
    });

    peer.on("stream", (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      dispatch(action.callAccepted());
      peer.signal(signal);
    });

    connection.current = peer;
  };

  return (
    <div>
      <VideoChat
        friends={friends}
        loadingFriends={loadingFriends}
        chatData={chatData}
        loadingChatData={loadingChatData}
        user={user}
        onDeleteChat={handleDeleteChat}
        onAddToChat={handleAddToChat}
        myVideo={myVideo}
        friendVideo={friendVideo}
        connection={connection}
        callToFriend={handleCallToFriend}
      />
    </div>
  );
};

export default Chat;
