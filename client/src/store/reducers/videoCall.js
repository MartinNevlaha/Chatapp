import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  currentStream: null,
};

const setVideoStream = (state, action) => {
  return updateObj(state, { currentStream: action.stream });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEO_STREAM:
      return setVideoStream(state, action);
    default:
      return state;
  }
};

export default reducer;
