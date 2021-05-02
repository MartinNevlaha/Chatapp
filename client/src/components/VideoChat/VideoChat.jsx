import React, { useState } from "react";
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
  const [showFriendsList, setShowFriendsList] = useState(false);


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
    <div className={classes.videoChat}>
      <ChatFriends
        show={showFriendsList}
        friends={friends}
        loading={loadingFriends}
        chatData={chatData}
        onAddToChat={onAddToChat}
        onShowFriends={setShowFriendsList}
      />

      <Messenger
        chatData={chatData}
        loadingChatData={loadingChatData}
        user={user}
        onDeleteChat={onDeleteChat}
        onShowFriends={setShowFriendsList}
        showFriends={showFriendsList}
      />
    </div>
  );
};

export default VideoChatComp;
