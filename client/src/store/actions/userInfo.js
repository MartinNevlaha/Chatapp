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

export const addUserOnInfoPage = () => {
  return {
    type: actionTypes.ADD_USER_ON_INFO_PAGE,
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

export const getUserFriendsSuccess = (friendsList) => {
  return {
    type: actionTypes.GET_USER_FRIENDS_SUCCESS,
    friendsList,
  };
};

export const getUserFriendsFailed = () => {
  return {
    type: actionTypes.GET_USER_FRIENDS_FAILLED,
  };
};

export const getUserFriends = (userId) => {
  return (dispatch) => {
    dispatch(getUserFriendsStart());
    axios
      .get(`/api/users/friends/${userId}`)
      .then((res) => dispatch(getUserFriendsSuccess(res.data.friendships)))
      .catch((err) => {
        dispatch(getUserFriendsFailed());
        dispatch(errorCreator(err.response));
      });
  };
};

export const getUserPostsStart = () => {
  return {
    type: actionTypes.GET_USER_POSTS_START,
  };
};

export const getUserPostSuccess = (userPosts) => {
  return {
    type: actionTypes.GET_USER_POSTS_SUCCESS,
    userPosts,
  };
};

export const getUserPostFailed = () => {
  return {
    type: actionTypes.GET_USER_POSTS_FAILED,
  };
};

export const getUserPosts = (userId) => {
  return (dispatch) => {
    dispatch(getUserPostsStart());
    axios
      .get(`/api/users/posts/${userId}`)
      .then((res) => {
        dispatch(getUserPostSuccess(res.data.posts))
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(getUserPostFailed());
      });
  };
};
