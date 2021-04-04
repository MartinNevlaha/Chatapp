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
    console.log(userId);
    dispatch(getUserInfoStart());
    axios
      .get(`/api/users/info/${userId}`)
      .then((res) => {
        dispatch(getUserInfoSuccess(res.data.user, res.data.isFriend));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
      });
  };
};

export const getUserFriendsStart = () => {
  return {
    type: actionTypes.GET_USER_FRIENDS_START,
  };
};

export const getUserFriendsSuccess = (friendList) => {
  return {
    type: actionTypes.GET_USER_FRIENDS_SUCCESS,
    friendList,
  };
};

export const getUserFriendsFailed = () => {
  return {
    type: actionTypes.GET_USER_FRIENDS_FAILLED,
  };
};

export const getUserFriends = (userId) => {
  return dispatch => {
    dispatch(getUserFriendsStart());
    axios.get(`/api/users/friends/${userId}`)
    .then()
    .catch(err => {
      dispatch(getUserFriendsFailed());
      dispatch(errorCreator(err.response))
    });
  }
}