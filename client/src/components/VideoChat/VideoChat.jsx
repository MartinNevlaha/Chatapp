import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import classes from "./VideoChat.module.scss";
import ChatFriends from "./ChatFriends/ChatFriends";
import Messenger from "./Messenger/Messenger";
import VideoCall from "./VideoCall/VideoCall";
import { VideoContext } from "../../context/VideoContext";
import * as action from "../../store/actions";
import useDimensions from "../../hooks/useDimensions";

const VideoChatComp = ({
  friends,
  loadingFriends,
  chatData,
  loadingChatData,
  user,
  onDeleteChat,
  onAddToChat,
  setOpenedChatId,
  openedChatId,
}) => {
  const dispatch = useDispatch();
  const [showFriendsList, setShowFriendsList] = useState(false);
  const { acceptCall } = useContext(VideoContext);
  const isMeCalling = useSelector(
    (state) => state.videoCall.callTo.isMeCalling
  );
  const callToInit = useSelector((state) => state.videoCall.callTo.init);
  const isReceivingCall = useSelector(
    (state) => state.videoCall.callFrom.isReceivingCall
  );
  const callAccepted = useSelector((state) => state.videoCall.callAccepted);
  const callFromUser = useSelector((state) => state.videoCall.callFrom.user);
  const callToUser = useSelector((state) => state.videoCall.callTo.user);
  const muteAudio = useSelector((state) => state.videoCall.muteAudio);
  const muteVideo = useSelector((state) => state.videoCall.muteVideo);
  const stream = useSelector((state) => state.videoCall.stream);

  const { width, height } = useDimensions();

  const handleCallToInit = (friend) => {
    dispatch(action.callToInit(friend));
  };

  VideoChatComp.propTypes = {
    friends: PropTypes.array,
    loadingFriends: PropTypes.bool,
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
    user: PropTypes.object,
    onDeleteChat: PropTypes.func,
    onAddToChat: PropTypes.func,
    setOpenedChatId: PropTypes.func,
    openedChatId: PropTypes.number,
  };

  const content = (
    <React.Fragment>
      <ChatFriends
        show={showFriendsList}
        friends={friends}
        loading={loadingFriends}
        chatData={chatData}
        onAddToChat={onAddToChat}
        onShowFriends={setShowFriendsList}
        onCallToInit={handleCallToInit}
      />
      {callToInit || isReceivingCall ? (
        <VideoCall
          isMeCalling={isMeCalling}
          callToInit={callToInit}
          isReceivingCall={isReceivingCall}
          callAccepted={callAccepted}
          onAcceptCall={acceptCall}
          user={callToInit ? callToUser : callFromUser}
          muteAudio={muteAudio}
          muteVideo={muteVideo}
          stream={stream}
        />
      ) : (
        <Messenger
          chatData={chatData}
          loadingChatData={loadingChatData}
          user={user}
          onDeleteChat={onDeleteChat}
          onShowFriends={setShowFriendsList}
          showFriends={showFriendsList}
          onCallToInit={handleCallToInit}
          setOpenedChatId={setOpenedChatId}
          openedChatId={openedChatId}
        />
      )}
    </React.Fragment>
  );

  let wrapper = <React.Fragment>{content}</React.Fragment>;

  if (width >= 500) {
    wrapper = <div className={classes.videoChat}>{content}</div>;
  }

  return wrapper;
};

export default VideoChatComp;
