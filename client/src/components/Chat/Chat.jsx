import React from "react";
import PropTypes from "prop-types";

import classes from "./Chat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";

const ChatComp = ({ friends, loadingFriends }) => {
  ChatComp.propTypes = {
    friends: PropTypes.array,
    loadingFriends: PropTypes.bool,
  };

  return (
    <div className={classes.chat}>
      <ChatFriends friends={friends} loading={loadingFriends} />
      <Messenger />
    </div>
  );
};

export default ChatComp;
{
}
