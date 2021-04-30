import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  currentStream: null,
  callAccepted: false,
  isMeCalling: false,
  callTo: {
    user: {},
    signal: {},
  },
  isReceivingCall: false,
  callFrom: {
    user: {},
    signal: {},
  },
};

const setVideoStream = (state, action) => {
  return updateObj(state, { currentStream: action.stream });
};

const callToFriend = (state, action) => {
  return updateObj(state, {
    isMeCalling: true,
    callTo: {
      ...state.callTo,
      user: action.callData.toUser,
      signal: action.callData.signal,
    },
  });
};

const callAccepted = (state, action) => {
  return updateObj(state, { callAccepted: true });
};

const friendCalling = (state, action) => {
  return updateObj(state, {
    isReceivingCall: true,
    callFrom: {
      ...state.callFrom,
      user: action.callData.fromUser,
      signal: action.callData.signal,
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEO_STREAM:
      return setVideoStream(state, action);
    case actionTypes.CALL_ACCEPTED:
      return callAccepted(state, action);
    case actionTypes.FRIEND_CALLING:
      return friendCalling(state, action);
    case actionTypes.CALL_REJECT:
      return initialState;
    case actionTypes.CALL_REJECT_RECIPIENT:
      return initialState;
    case actionTypes.CALL_TO_FRIEND:
      return callToFriend(state, action);
    default:
      return state;
  }
};

export default reducer;
