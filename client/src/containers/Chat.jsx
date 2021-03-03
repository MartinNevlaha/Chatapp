import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import useSocket from "../hooks/socketConnect";
import ChatText from "../components/ChatText/ChatText";

const Chat = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userAuth.user.userId);

  useEffect(() => {
    dispatch(action.fetchUserProfile());
  }, [dispatch]);

  useSocket(userId, dispatch);

  return (
    <div>
      <ChatText />
    </div>
  );
};

export default Chat;
