import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import ChatComp from "../components/Chat/Chat";

const Chat = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userProfile.user.id);
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);
  const friends = useSelector((state) => state.friends.userFriends);
  const loadingFriends = useSelector((state) => state.friends.loading);

  useEffect(() => {
    dispatch(action.fetchChatData());
    dispatch(action.getUserFriends(+userId));
  }, [dispatch]);

  return (
    <div>
      <ChatComp friends={friends} loadingFriends={loadingFriends} />
    </div>
  );
};

export default Chat;
