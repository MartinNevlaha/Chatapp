import * as actionTypes from "./actionTypes";

export const errorCreated = (error) => {
  return {
    type: actionTypes.REQUEST_ERROR,
    error,
  };
};

export const hideError = () => {
  return {
    type: actionTypes.HIDE_REQUEST_ERROR,
  };
};

export const errorCreator = (error) => {
  return (dispatch) => {
    dispatch(errorCreated(error));
    setTimeout(() => {
      dispatch(hideError());
    }, 3500);
  };
};

export const successCreated = (message) => {
  return {
    type: actionTypes.REQUEST_SUCCESS,
    message,
  };
};

export const hideSuccess = () => {
  return {
    type: actionTypes.HIDE_REQUEST_SUCCESS,
  };
};

export const successCreator = (message) => {
  return (dispatch) => {
    dispatch(successCreated(message));
    setTimeout(() => {
      dispatch(hideSuccess());
    }, 3500);
  };
};
