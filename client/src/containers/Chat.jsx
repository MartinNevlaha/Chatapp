import React, { useEffect } from "react";
import {useDispatch} from "react-redux";

import * as action from "../store/actions";
import ChatText from "../components/ChatText/ChatText";

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(action.fetchUserProfile());
  }, [dispatch])
  return (
    <div>
      <ChatText />
    </div>
  );
};

export default Chat;
