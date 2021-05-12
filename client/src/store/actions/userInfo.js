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
    dispatch(getUserInfoStart());
    axios
      .get(`/api/users/info/${userId}`)
      .then((res) => {
        dispatch(getUserInfoSuccess(res.data.user, res.data.isFriend));
      })
      .catch((err) => {
        dispatch(errorCreator(err));
      });
  };
};

export const getUserPostsStart = () => {
  return {
    type: actionTypes.GET_USER_POSTS_START,
  };
};

export const getUserPostSuccess = (userPosts, count) => {
  return {
    type: actionTypes.GET_USER_POSTS_SUCCESS,
    userPosts,
    count,
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
        dispatch(getUserPostSuccess(res.data.posts, res.data.count));
      })
      .catch((err) => {
        dispatch(errorCreator(err));
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
      .catch((err) => dispatch(errorCreator(err)));
  };
};

export const deleteFriendshipSucces = () => {
  return {
    type: actionTypes.DELETE_FRIENDSHIP,
  };
};

export const deleteFriendship = (friendId) => {
  return (dispatch) => {
    axios
      .delete(`/api/friendship/${friendId}`)
      .then(res => dispatch(deleteFriendshipSucces()))
      .catch((err) => dispatch(errorCreator(err)));
  };
};
