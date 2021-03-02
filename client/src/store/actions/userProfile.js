import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator, successCreator } from "./requestStatus";

export const fetchUserProfileStart = () => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_START,
  };
};

export const fetchUserProfileSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
    userData,
  };
};

export const fetchUserDataFailed = () => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_FAILED,
  };
};

export const fetchUserProfile = () => {
  return (dispatch, getState) => {
    const token = getState().userAuth.token;
    dispatch(fetchUserProfileStart());
    axios.get("/api/user/profile")
    .then(res => {
      dispatch(fetchUserProfileSuccess(res.data.user));
      dispatch(successCreator(res.data.message));
    })
    .catch(err => {
      dispatch(fetchUserDataFailed());
      dispatch(errorCreator(err.response))
    })
  };
};
