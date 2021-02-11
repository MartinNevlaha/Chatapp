import jwtDecode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { errorCreator, successCreator, requestInit } from "./requestStatus";

export const registerSuccess = (decodedToken, token) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    decodedToken,
    token,
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    dispatch(requestInit());
    axios
      .post("/api/users/register", data)
      .then((res) => {
        const decodedToken = jwtDecode(res.data.token);
        dispatch(registerSuccess(decodedToken, res.data.token));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};
