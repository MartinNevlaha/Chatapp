import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator, successCreator } from "./requestStatus";

export const fetchActiveUsersStart = () => {
  return {
    type: actionTypes.FETCH_ACTIVE_USERS_START,
  };
};

export const fetchActiveUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_ACTIVE_USERS_SUCCESS,
    users,
  };
};

export const fetchActiveUsersFailed = () => {
  return {
    type: actionTypes.FETCH_ACTIVE_USERS_FAILED,
  };
};

export const fetchActiveUsers = (page, limit) => {
  return (dispatch) => {
    dispatch(fetchActiveUsersStart());
    axios
      .get(`/api/users/users?page=${page}&limit=${limit}`)
      .then((res) => {
        const users = res.data.users.map((user) => {
          return { ...user, online: false };
        });
        dispatch(fetchActiveUsersSuccess(users));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(fetchActiveUsersFailed());
      });
  };
};
