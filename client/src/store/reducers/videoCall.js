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
    default:
      return state;
  }
};

export default reducer;
