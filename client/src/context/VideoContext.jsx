import React, { createContext, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Peer from "simple-peer";
import { Howl } from "howler";

import callTone from "../assets/sounds/call.mp3";
import * as action from "../store/actions";
import { ICE_SERVERS } from "../config/iceServers";

const callRingtone = new Howl({
  src: [callTone],
  loop: true,
  preload: true,
});

export const VideoContext = createContext({});

export const VideoContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.chat.socket);
  const callFrom = useSelector((state) => state.videoCall.callFrom);
  const me = useSelector((state) => state.userProfile.user);
  const [stream, setStream] = useState(null);

  const myVideoRef = useRef();
  const friendVideoRef = useRef();
  const connectionRef = useRef();

  const callToFriend = (friend) => {
    callRingtone.play();
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        myVideoRef.current.srcObject = stream;

        // for production complte config IceSerers
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
            iceServers: ICE_SERVERS
          },
          stream: stream,
        });

        connectionRef.current = peer;

        peer.on("signal", (data) => {
          const callData = {
            friend: friend,
            signal: data,
            fromUser: me,
          };

          dispatch(action.callTo(callData));

          socket.emit("callToFriend", callData);
        });

        peer.on("stream", (currentStream) => {
          if (friendVideoRef.current)
            friendVideoRef.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
          dispatch(action.callAccepted("callTo"));
          peer.signal(signal);
          callRingtone.stop();
          callRingtone.unload();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptCall = () => {
    dispatch(action.callAccepted("callFrom"));

    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("callAccepted", { signal: data, user: callFrom.user });
    });

    peer.on("stream", (currentStream) => {
      friendVideoRef.current.srcObject = currentStream;
    });

    peer.signal(callFrom.signal);

    connectionRef.current = peer;
  };

  return (
    <VideoContext.Provider
      value={{
        stream,
        myVideoRef,
        friendVideoRef,
        callToFriend,
        acceptCall,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
