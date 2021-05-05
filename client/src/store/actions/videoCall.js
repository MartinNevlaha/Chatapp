import * as actionTypes from "./actionTypes";
import store from "../index";
import { Howl } from "howler";

import callSound from "../../assets/sounds/call.mp3";

const callFx = new Howl({
  src: [callSound],
  preload: true,
  loop: true,
});

export const callToInit = (friend) => {
  return {
    type: actionTypes.CALL_TO_INIT,
    friend,
  };
};

export const callTo = (callData) => {
  return {
    type: actionTypes.CALL_TO,
    callData,
  };
};

export const callFrom = (callData) => {
  callFx.play();
  return {
    type: actionTypes.CALL_FROM,
    callData,
  };
};

export const callAccepted = (callType) => {
  callFx.stop();
  return {
    type: actionTypes.CALL_ACCEPTED,
    callType,
  };
};

export const callRejected = () => {
  callFx.stop();
  const socket = store.getState().chat.socket;
  return {
    type: actionTypes.CALL_REJECTED,
    socket,
  };
};

export const callRejectedReceive = () => {
  callFx.stop();
  return {
    type: actionTypes.CALL_REJECTED_RECEIVE,
  };
};

export const muteAudio = () => {
  return {
    type: actionTypes.MUTE_AUDIO,
  };
};

export const muteVideo = () => {
  return {
    type: actionTypes.MUTE_VIDEO,
  };
};

export const setStream = (stream) => {
  return {
    type: actionTypes.SET_STREAM,
    stream,
  };
};

export const cleanUpVideoCall = () => {
  callFx.unload();
  return {
    type: actionTypes.CLEAN_UP_VIDEO_CALL,
  };
};
