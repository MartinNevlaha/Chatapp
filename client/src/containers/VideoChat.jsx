import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import * as action from "../store/actions";
import VideoChat from "../components/VideoChat/VideoChat";
import { VideoContextProvider } from "../context/VideoContext";
import useSocket from "../hooks/socketConnect";
import ErrorFallback from "../components/UI/ErrorFallback/ErrorFallback";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.user);
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);
  const friends = useSelector((state) => state.friends.userFriends);
  const loadingFriends = useSelector((state) => state.friends.loading);
  const [openedChatId, setOpenedChatId] = useState(null);
  const userId = +user.id;

  useEffect(() => {
    dispatch(action.fetchChatData());
    dispatch(action.getUserFriends(userId));
  }, [dispatch, userId]);

  useSocket(user, dispatch, openedChatId);

  const handleDeleteChat = (chatId, deletedChat) => {
    dispatch(action.deleteChat(chatId, deletedChat));
  };

  const handleAddToChat = (friendId) => {
    const friendData = {
      friendId: friendId,
    };
    dispatch(action.addToChat(friendData));
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => dispatch(action.cleanUpVideoCall())}
    >
      <VideoContextProvider>
        <VideoChat
          friends={friends}
          loadingFriends={loadingFriends}
          chatData={chatData}
          loadingChatData={loadingChatData}
          user={user}
          onDeleteChat={handleDeleteChat}
          onAddToChat={handleAddToChat}
          setOpenedChatId={setOpenedChatId}
          openedChatId={openedChatId}
        />
      </VideoContextProvider>
    </ErrorBoundary>
  );
};

export default Chat;
