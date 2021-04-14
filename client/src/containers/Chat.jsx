import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import ChatToast from "../components/Chat/ChatToast";

const Chat = () => {
  const dispatch = useDispatch();
  const [openChatMenu, setOpenChatMenu] = useState(false);
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);

  const handleOpenChatMenu = () => {
    setOpenChatMenu(true);
    dispatch(action.fetchChatData());
  };

  return (
    <div>
      <ChatToast onOpenChatMenu={handleOpenChatMenu} />
      {console.log(chatData)}
    </div>
  );
};

export default Chat;
