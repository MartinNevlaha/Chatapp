import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import classes from "./VideoChat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";
import VideoCall from "./VideoCall/VideoCall";
import { VideoContext } from "../../context/VideoContext";

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
  const { callToFriend, acceptCall } = useContext(VideoContext);
  const isMeCalling = useSelector(
    (state) => state.videoCall.callTo.isMeCalling
  );
  const isReceivingCall = useSelector(
    (state) => state.videoCall.callFrom.isReceivingCall
  );

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
        onCallToFriend={callToFriend}
      />
      {isMeCalling || isReceivingCall ? (
        <VideoCall
          user={user}
          isMeCalling={isMeCalling}
          isReceivingCall={isReceivingCall}
        />
      ) : (
        <Messenger
          chatData={chatData}
          loadingChatData={loadingChatData}
          user={user}
          onDeleteChat={onDeleteChat}
          onShowFriends={setShowFriendsList}
          showFriends={showFriendsList}
          onCallToFriend={callToFriend}
        />
      )}
    </div>
  );
};

export default VideoChatComp;
