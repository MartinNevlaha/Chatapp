import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

export const getUserInfoStart = () => {
  return {
    type: actionTypes.GET_USER_INFO_START,
  };
};

export const getUserInfoSuccess = (userInfo, isFriend) => {
  return {
    type: actionTypes.GET_USER_INFO_SUCCESS,
    userInfo,
    isFriend,
  };
};

export const getUserInfoFailed = () => {
  return {
    type: actionTypes.GET_USER_INFO_FAILED,
  };
};

export const getUserInfo = (userId) => {
  return (dispatch) => {
    dispatch(getUserInfoStart());
    axios
      .get(`/api/users/info/${userId}`)
      .then(res => {
        dispatch(getUserInfoSuccess(res.data.user, res.data.isFriend))
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
      });
  };
};

