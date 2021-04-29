import jwtDecode from "jwt-decode";

import store from "../index";
import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
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
      .post("/api/auth/register", userData)
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
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userData,
    token,
  };
};

export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
};

export const logout = () => {
  const socket = store.getState().chat.socket;
  if (socket) socket.disconnect();;
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, exp * 1000);
  };
};

export const loginUser = (userData, history) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post("/api/auth/login", userData)
      .then((res) => {
        const decodeToken = jwtDecode(res.data.token);
        dispatch(loginSuccess(decodeToken, res.data.token));
        localStorage.setItem("token", res.data.token);
        dispatch(checkAuthTimeout(decodeToken.exp - decodeToken.iat));
        dispatch(successCreator(res.data.message));
        history.push("/");
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(loginFailed());
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const decodedToken = jwtDecode(token);
      const actualTime = Date.now() / 1000;
      if (decodedToken.exp > actualTime) {
        dispatch(loginSuccess(decodedToken, token));
        const remainTime = decodedToken.exp - actualTime;
        dispatch(checkAuthTimeout(remainTime));
      }
    }
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

export const emailActivation = (token, history) => {
  return (dispatch) => {
    dispatch(emailActivStart());
    axios
      .patch(`/api/auth/activation/${token}`)
      .then((res) => {
        dispatch(emailActivSucces(res.data.activated));
        dispatch(successCreator(res.data.message));
        history.push("/login");
      })
      .catch((err) => {
        dispatch(emailActivFailed());
        dispatch(errorCreator(err.response));
      });
  };
};

export const resetAuth = () => {
  return {
    type: actionTypes.RESET_AUTH_STATUS,
  };
};
