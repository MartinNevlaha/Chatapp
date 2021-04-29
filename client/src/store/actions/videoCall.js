import * as actionTypes from "./actionTypes";

export const setVideoStream = (stream) => {
  return {
    type: actionTypes.SET_VIDEO_STREAM,
    stream,
  };
};
