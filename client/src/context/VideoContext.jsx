import React, { createContext, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Peer from "simple-peer";

import * as action from "../store/actions";

export const VideoContext = createContext({});

export const VideoContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.chat.socket);
  const callFrom = useSelector(state => state.videoCall.callFrom);
  const me = useSelector((state) => state.userProfile.user);
  const [stream, setStream] = useState(null);

  const myVideoRef = useRef();
  const friendVideoRef = useRef();
  const connectionRef = useRef();

  const callToFriend = (friend) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

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
      friendVideoRef.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      dispatch(action.callAccepted("callTo"));
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const acceptCall = () => {
    dispatch(action.callAccepted("callFrom"));

    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("callAccepted", { signal: data, user: callFrom.user });
    });

    peer.signal(callFrom.signal);

    connectionRef.current = peer;
  };

  return (
    <VideoContext.Provider
      value={{
        setStream,
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
