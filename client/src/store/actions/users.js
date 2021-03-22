import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator, successCreator } from "./requestStatus";

export const fetchActiveUsersStart = () => {
  return {
    type: actionTypes.FETCH_ACTIVE_USERS_START,
  };
};

export const fetchActiveUsersSuccess = (users, totalRecordsInDb) => {
  return {
    type: actionTypes.FETCH_ACTIVE_USERS_SUCCESS,
    users,
    totalRecordsInDb,
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
        dispatch(fetchActiveUsersSuccess(users, res.data.count));
        dispatch(successCreator(res.data.message));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(fetchActiveUsersFailed());
      });
  };
};

export const addFriendStart = () => {
  return {
    type: actionTypes.ADD_FRIEND_START,
  };
};

export const addFriendSuccess = (userId) => {
  return {
    type: actionTypes.ADD_FRIEND_SUCCESS,
    userId,
  };
};

export const addFriendFailed = () => {
  return {
    type: actionTypes.ADD_FRIEND_FAILED,
  };
};

export const addFriend = (userId) => {
  return dispatch => {
    dispatch(addFriendStart());
    axios.post("/api/friendship/", userId)
    .then(res => console.log(res.data))
    .catch(err => {
      dispatch(addFriendFailed());
      dispatch(errorCreator(err.response))
    })
  }
}