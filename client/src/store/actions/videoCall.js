import * as actionTypes from "./actionTypes";

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
    callType
  };
};
