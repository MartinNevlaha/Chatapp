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
          return { ...user, loadingAddFriend: false };
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

export const addFriendStart = (recipient) => {
  return {
    type: actionTypes.ADD_FRIEND_START,
    recipient,
  };
};

export const addFriendSuccess = (recipient, status) => {
  return {
    type: actionTypes.ADD_FRIEND_SUCCESS,
    recipient,
    status,
  };
};

export const addFriendFailed = (recipient) => {
  return {
    type: actionTypes.ADD_FRIEND_FAILED,
    recipient,
  };
};

export const addFriend = (userId) => {
  return (dispatch) => {
    dispatch(addFriendStart(userId.friendId));
    axios
      .post("/api/friendship/", userId)
      .then((res) => {
        dispatch(successCreator(res.data.message));
        dispatch(
          addFriendSuccess(
            res.data.friendship.user_2,
            res.data.friendship.status
          )
        );
      })
      .catch((err) => {
        dispatch(addFriendFailed(userId.friendId));
        dispatch(errorCreator(err.response));
      });
  };
};
