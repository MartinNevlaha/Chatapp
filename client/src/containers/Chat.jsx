import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "../hooks/socketConnect";
import * as action from "../store/actions";
import ChatComp from "../components/Chat/Chat";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.user);
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);
  const friends = useSelector((state) => state.friends.userFriends);
  const loadingFriends = useSelector((state) => state.friends.loading);

  useEffect(() => {
    dispatch(action.fetchChatData());
    dispatch(action.getUserFriends(+user.id));
  }, [dispatch]);

  useSocket(user, dispatch);

  return (
    <div>
      <ChatComp
        friends={friends}
        loadingFriends={loadingFriends}
        chatData={chatData}
        loadingChatData={loadingChatData}
        userId={user.id}
      />
    </div>
  );
};

export default Chat;
