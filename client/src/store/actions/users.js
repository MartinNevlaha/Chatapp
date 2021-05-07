import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";
import axiosOrigin from 'axios';
import { addUserOnInfoPage } from "../actions/userInfo";

let CancelToken = axiosOrigin.CancelToken;
let cancel; 

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
      })
      .catch((err) => {
        dispatch(errorCreator(err));
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

export const addFriend = (userId, requestType) => {
  return (dispatch) => {
    dispatch(addFriendStart(userId.friendId));
    axios
      .post("/api/friendship/", userId)
      .then((res) => {
        dispatch(
          addFriendSuccess(
            res.data.friendship.user_2,
            res.data.friendship.status
          )
        );
        if (requestType === "onInfoPage") {
          dispatch(addUserOnInfoPage());
        }
      })
      .catch((err) => {
        dispatch(addFriendFailed(userId.friendId));
        dispatch(errorCreator(err));

      });
  };
};

export const searchUsersStart = () => {
  return {
    type: actionTypes.SEARCH_USERS_START,
  };
};

export const searchUsersSuccess = (users, count) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCES,
    users,
    count
  };
};

export const searchUsersFailed = () => {
  return {
    type: actionTypes.SEARCH_USERS_FAILED,
  };
};

export const searchUsers = (search, limit, page) => {
  return (dispatch) => {
    dispatch(searchUsersStart());
    if (typeof cancel !== "undefined") {
      cancel("Cancel request")
    };

    axios
      .get(`/api/users/search?search=${search}&limit=${limit}&page=${page}`, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
      .then(res => {
        dispatch(searchUsersSuccess(res.data.users, res.data.count))
      })
      .catch(err => {
        dispatch(errorCreator(err));
        dispatch(searchUsersFailed());
      });
  };
};
