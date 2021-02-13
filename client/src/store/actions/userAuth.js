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
    registered,
  };
};

export const registerFailed = () => {
  return {
    type: actionTypes.REGISTER_FAILED,
  };
};

export const registerUser = (userData) => {
  return (dispatch) => {
    dispatch(registerStart());
    axios
      .post("/api/users/register", userData)
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

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (userData, token) => {
  const {userId, firstName, lastName, fullName, role} = userData;

  return {
    type: actionTypes.LOGIN_SUCCESS,
    userId,
    firstName,
    lastName,
    fullName,
    role,
    token,
  };
};

export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
};

export const loginUser = (userData) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post("/api/users/login", userData)
      .then((res) => {
        console.log(res)
        dispatch(loginSuccess(jwtDecode(res.data.token), res.data.token));
        dispatch(successCreator());
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(loginFailed());
      });
  };
};
