import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  currentStream: null,
  callAccepted: false,
  isReceivingCall: false,
  callFrom: {
    user: {},
    signal: {},
  },
};

const setVideoStream = (state, action) => {
  return updateObj(state, { currentStream: action.stream });
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
    default:
      return state;
  }
};

export default reducer;
