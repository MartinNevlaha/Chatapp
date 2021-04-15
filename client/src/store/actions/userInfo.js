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
      .then((res) => {
        const data = res.data.friendships;
        data.forEach((friendship) => friendship.status = "offline");
        dispatch(getUserFriendsSuccess(data));
      })
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

export const getUserPosts = (userId, page, limit) => {
  return (dispatch) => {
    dispatch(getUserPostsStart());
    axios
      .get(`/api/users/posts/${userId}?page=${page}&limit=${limit}`)
      .then((res) => {
        dispatch(getUserPostSuccess(res.data.posts));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(getUserPostFailed());
      });
  };
};

export const cleanUpUserInfo = () => {
  return {
    type: actionTypes.CLEAN_UP_USER_INFO,
  };
};

export const likeUserPostSucces = (likes, likeAction) => {
  return {
    type: actionTypes.LIKE_USER_POST,
    likes,
    likeAction,
  };
};

export const likeUserPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/posts/like-status/${postId}`, data)
      .then((res) => {
        dispatch(likeUserPostSucces(res.data.likes, res.data.likeAction));
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};
