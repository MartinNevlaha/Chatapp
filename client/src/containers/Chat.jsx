import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import ChatToast from "../components/Chat/ChatToast/ChatToast";

const Chat = () => {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);

  useEffect(() => {
    dispatch(action.fetchChatData());
  }, [dispatch]);

  return <div>
    <ChatToast />
    {console.log(chatData)}
    </div>;
};

export default Chat;
