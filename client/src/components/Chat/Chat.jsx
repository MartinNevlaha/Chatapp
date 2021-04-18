import React from "react";
import PropTypes from "prop-types";

import classes from "./Chat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";

const ChatComp = ({ friends, loadingFriends, chatData, loadingChatData, userId }) => {
  ChatComp.propTypes = {
    friends: PropTypes.array,
    loadingFriends: PropTypes.bool,
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
    userId: PropTypes.number
  };

  return (
    <div className={classes.chat}>
      <ChatFriends friends={friends} loading={loadingFriends} />
      <Messenger chatData={chatData} loadingChatData={loadingChatData} userId={userId} />
    </div>
  );
};

export default ChatComp;
{
}
