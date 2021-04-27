import React from "react";

import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Notification from "./Notification/Notification";
import Options from "./Options/Options";

const VideoChat = () => {
  return <div>
    <VideoPlayer />
    <Notification />
    <Options />
  </div>;
};

export default VideoChat;
