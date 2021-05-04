import * as actionTypes from "./actionTypes";
import store from "../index";

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
  return {
    type: actionTypes.CALL_FROM,
    callData,
  };
};

export const callAccepted = (callType) => {
  return {
    type: actionTypes.CALL_ACCEPTED,
    callType,
  };
};

export const callRejected = () => {
  const socket = store.getState().chat.socket;
  return {
    type: actionTypes.CALL_REJECTED,
    socket,
  };
};

export const callRejectedReceive = () => {
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
