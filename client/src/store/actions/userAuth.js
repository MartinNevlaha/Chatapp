import jwtDecode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { errorCreator, successCreator } from "./requestStatus";

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerSuccess = (registered) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    registered
  };
};

export const registerFailed = () => {
  return {
    type: actionTypes.REGISTER_FAILED,
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    dispatch(registerStart());
    axios
      .post("/api/users/register", data)
      .then((res) => {
        dispatch(registerSuccess(res.data.registered));
        dispatch(successCreator());
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(registerFailed());
      });
  };
};
