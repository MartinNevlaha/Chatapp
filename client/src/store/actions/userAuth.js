import jwtDecode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { errorCreator, successCreator, requestInit } from "./requestStatus";

export const registerOrLoginSuccess = (decodedToken, token) => {
  return {
    type: actionTypes.REGISTER_LOGIN_SUCCESS,
    decodedToken,
    token,
  };
};

export const registerOrLoginUser = (data, requestType) => {
  return (dispatch) => {
    dispatch(requestInit());
    axios
      .post(`/api/users/${requestType}`, data)
      .then((res) => {
        const decodedToken = jwtDecode(res.data.token);
        dispatch(registerOrLoginSuccess(decodedToken, res.data.token));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};
