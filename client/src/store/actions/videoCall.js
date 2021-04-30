import * as actionTypes from "./actionTypes";
import store from "../index";

export const setVideoStream = (stream) => {
  return {
    type: actionTypes.SET_VIDEO_STREAM,
    stream,
  };
};

export const callToFriend = (friendId, signal) => {
  const friends = store.getState().friends.userFriends;
  const user = friends.filter((friend) => friend.id === friendId)[0];
  const callData = {
    toUser: user,
    signal: signal,
  };
  return {
    type: actionTypes.CALL_TO_FRIEND,
    callData,
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
    callData,
  };
};

export const callReject = () => {
  return {
    type: actionTypes.CALL_REJECT,
  };
};

export const callRejectRecipient = () => {
  return {
    type: actionTypes.CALL_REJECT_RECIPIENT,
  };
};
