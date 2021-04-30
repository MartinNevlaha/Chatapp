import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./VideoChat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";
import VideoCall from "./VideoCall/VideoCall";

const VideoChatComp = ({
  friends,
  loadingFriends,
  chatData,
  loadingChatData,
  user,
  onDeleteChat,
  onAddToChat,
  myVideo,
  friendVideo,
  connection,
  callToFriend

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
    myVideo: PropTypes.object,
    friendVideo: PropTypes.object,
    connection: PropTypes.object,
    callToFriend: PropTypes.func
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
      {false ? (
        <VideoCall
          user={user}
          myVideo={myVideo}
          friendVideo={friendVideo}
          connection={connection}
        />
      ) : (
        <Messenger
          chatData={chatData}
          loadingChatData={loadingChatData}
          user={user}
          onDeleteChat={onDeleteChat}
          onShowFriends={setShowFriendsList}
          showFriends={showFriendsList}
          callToFriend={callToFriend}
        />
      )}
    </div>
  );
};

export default VideoChatComp;
