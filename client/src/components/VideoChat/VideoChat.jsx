import React from "react";
import PropTypes from "prop-types";

import classes from "./VideoChat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";

const VideoChatComp = ({
  friends,
  loadingFriends,
  chatData,
  loadingChatData,
  user,
  onDeleteChat,
  onAddToChat,
}) => {
  VideoChatComp.propTypes = {
    friends: PropTypes.array,
    loadingFriends: PropTypes.bool,
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
    user: PropTypes.object,
    onDeleteChat: PropTypes.func,
    onAddToChat: PropTypes.func,
  };

  return (
    <div className={classes.chat}>
      <ChatFriends
        friends={friends}
        loading={loadingFriends}
        chatData={chatData}
        onAddToChat={onAddToChat}
      />
      <Messenger
        chatData={chatData}
        loadingChatData={loadingChatData}
        user={user}
        onDeleteChat={onDeleteChat}
      />
    </div>
  );
};

export default VideoChatComp;
