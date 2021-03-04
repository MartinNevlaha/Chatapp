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
    axios
      .get("/api/user/profile")
      .then((res) => {
        dispatch(fetchUserProfileSuccess(res.data.user));
      })
      .catch((err) => {
        dispatch(fetchUserDataFailed());
        dispatch(errorCreator(err.response));
      });
  };
};

export const updateUserProfileStart = () => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_START,
  };
};

export const updateUserProfileSuccess = (userData) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
    userData,
  };
};

export const updateUserProfileFailed = () => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_FAILED,
  };
};

export const updateUserProfile = (userData) => {
  return (dispatch) => {
    dispatch(updateUserProfileStart());
    axios
      .put("/api/user/update", userData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        dispatch(updateUserProfileSuccess(res.data.user));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => {
        dispatch(updateUserProfileFailed());
        dispatch(errorCreator(err.response));
      });
  };
};
