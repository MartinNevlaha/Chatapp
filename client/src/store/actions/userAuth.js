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
        dispatch(successCreator(res.data.message));
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
  const { userId, firstName, lastName, fullName, role } = userData;

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
        dispatch(loginSuccess(jwtDecode(res.data.token), res.data.token));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(loginFailed());
      });
  };
};

export const emailActivStart = () => {
  return {
    type: actionTypes.EMAIL_ACTIV_START,
  };
};

export const emailActivSucces = (activated) => {
  return {
    type: actionTypes.EMAIL_ACTIV_SUCCESS,
    activated,
  };
};

export const emailActivFailed = () => {
  return {
    type: actionTypes.EMAIL_ACTIV_FAILED,
  };
};

export const emailActivation = (token) => {
  return (dispatch) => {
    dispatch(emailActivStart());
    axios
      .put(`/api/users/activation/${token}`)
      .then((res) => {
        dispatch(emailActivSucces(res.data.activated));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => {
        dispatch(emailActivFailed());
        dispatch(errorCreator(err.response));
      });
  };
};

export const resetAuth = () => {
  return {
    type: actionTypes.RESET_AUTH_STATUS
  }
}