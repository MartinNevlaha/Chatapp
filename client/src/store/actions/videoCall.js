import * as actionTypes from "./actionTypes";

export const setVideoStream = (stream) => {
  return {
    type: actionTypes.SET_VIDEO_STREAM,
    stream,
  };
};

export const callAccepted = () => {
  return {
    type: actionTypes.CALL_ACCEPTED,
  };
};

export const friendCalling = (callData) => {
  return {
    type: actionTypes.FRIEND_CALLING,
    callData
  }
}