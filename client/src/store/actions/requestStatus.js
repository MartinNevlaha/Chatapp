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

export const errorCreator = (err) => {
  return (dispatch) => {
    let error;
    if (err.response) {
      error = {
        message: err.response.data.message,
        code: err.response.status,
      };
    } else {
      error = err;
    }
    dispatch(errorCreated(error));
    setTimeout(() => {
      dispatch(hideError());
    }, 3500);
  };
};

export const hideSuccess = () => {
  return {
    type: actionTypes.HIDE_REQUEST_SUCCESS,
  };
};
