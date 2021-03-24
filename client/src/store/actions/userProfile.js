import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator, successCreator } from "./requestStatus";
import { logout } from "./index";

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
  return (dispatch) => {
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


export const deleteAccountStart = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_START,
  };
};

export const deleteAccountSuccess = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
  };
};

export const deleteAccountFailed = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAILED,
  };
};

export const deleteAccount = () => {
  return (dispatch) => {
    dispatch(deleteAccountStart());
    axios
      .delete("/api/user/")
      .then((res) => {
        dispatch(deleteAccountSuccess());
        dispatch(logout());
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(deleteAccountFailed());
      });
  };
};