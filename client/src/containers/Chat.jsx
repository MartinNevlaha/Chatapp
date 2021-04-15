import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";

const Chat = () => {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.chatData);
  const loadingChatData = useSelector((state) => state.chat.loadingChatData);

  useEffect(() => {
    dispatch(action.fetchChatData());
  }, [dispatch]);

  return <div>{console.log(chatData)} ... chat</div>;
};

export default Chat;
