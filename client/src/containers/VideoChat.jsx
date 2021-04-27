import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import VideoChatComp from "../components/VideoChat/VideoChat";

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const socket = useSelector((state) => state.chat.socket);
  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        //myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <VideoChatComp />
    </div>
  );
};

export default VideoChat;
