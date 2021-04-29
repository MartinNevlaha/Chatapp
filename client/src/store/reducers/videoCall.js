import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  currentStream: null,
  callAccepted: false,
};

const setVideoStream = (state, action) => {
  return updateObj(state, { currentStream: action.stream });
};

const callAccepted = (state, action) => {
  return updateObj(state, { callAccepted: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEO_STREAM:
      return setVideoStream(state, action);
    case actionTypes.CALL_ACCEPTED:
      return callAccepted(state, action);
    default:
      return state;
  }
};

export default reducer;
