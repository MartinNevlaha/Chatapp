import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initalState = {
  callTo: {
    isMeCalling: false,
    user: null,
    signal: null,
    init: false,
  },

  callFrom: {
    isReceivingCall: false,
    user: null,
    signal: null,
  },
  callAccepted: false,
  muteAudio: false,
  muteVideo: false,
  stream: null,
};

const callToInit = (state, action) => {
  return updateObj(state, {
    callTo: {
      ...state.callTo,
      init: true,
      user: action.friend,
    },
  });
};

const callTo = (state, action) => {
  return updateObj(state, {
    callTo: {
      ...state.callTo,
      isMeCalling: true,
      signal: action.callData.signal,
    },
  });
};

const callFrom = (state, action) => {
  return updateObj(state, {
    callFrom: {
      ...state.callFrom,
      isReceivingCall: true,
      signal: action.callData.signal,
      user: action.callData.fromUser,
    },
  });
};

const callAccepted = (state, action) => {
  return updateObj(state, {
    callAccepted: true,
  });
};

const callRejected = (state, action) => {
  const sentToUser = state.callTo.isMeCalling ? state.callTo : state.callFrom;
  action.socket.emit("callRejected", sentToUser);
  if (typeof state.stream !== "undefined" && state.stream !== null)
    state.stream.getTracks().forEach((track) => track.stop());
  return initalState;
};

const callRejectedReceive = (state, action) => {
  if (typeof state.stream !== "undefined" && state.stream !== null)
    state.stream.getTracks().forEach((track) => track.stop());
  return initalState;
};

const muteAudio = (state, action) => {
  return updateObj(state, { muteAudio: !state.muteAudio });
};

const muteVideo = (state, action) => {
  return updateObj(state, { muteVideo: !state.muteVideo });
};

const setStream = (state, action) => {
  return updateObj(state, { stream: action.stream });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.CALL_TO_INIT:
      return callToInit(state, action);
    case actionTypes.CALL_TO:
      return callTo(state, action);
    case actionTypes.CALL_FROM:
      return callFrom(state, action);
    case actionTypes.CALL_ACCEPTED:
      return callAccepted(state, action);
    case actionTypes.CALL_REJECTED:
      return callRejected(state, action);
    case actionTypes.CALL_REJECTED_RECEIVE:
      return callRejectedReceive(state, action);
    case actionTypes.MUTE_AUDIO:
      return muteAudio(state, action);
    case actionTypes.MUTE_VIDEO:
      return muteVideo(state, action);
    case actionTypes.SET_STREAM:
      return setStream(state, action);
    default:
      return state;
  }
};

export default reducer;
