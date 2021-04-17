import React from "react";
import PropTypes from "prop-types";

import classes from "./Chat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";

const ChatComp = ({ friends, loadingFriends, chatData, loadingChatData }) => {
  ChatComp.propTypes = {
    friends: PropTypes.array,
    loadingFriends: PropTypes.bool,
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
  };

  return (
    <div className={classes.chat}>
      <ChatFriends friends={friends} loading={loadingFriends} />
      <Messenger chatData={chatData} loadingChatData={loadingChatData} />
    </div>
  );
};

export default ChatComp;
{
}
