import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

export const createPostStart = () => {
  return {
    type: actionTypes.CREATE_POST_START,
  };
};

export const createPostSuccess = (post) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    post,
  };
};

export const createPostFailed = () => {
  return {
    type: actionTypes.CREATE_POST_FAILED,
  };
};

export const createPost = (postData) => {
  const config = {
    //onUploadProgress: (progressEvent) => {
    //  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //},
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return (dispatch, getState) => {
    const user = getState().userProfile.user;
    dispatch(createPostStart());
    axios
      .post("/api/posts/create", postData, config)
      .then((res) => {
        const post = {
          ...res.data.post,
          User: user,
        };
        dispatch(createPostSuccess(post));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(createPostFailed());
      });
  };
};

export const fetchFriendsPostStart = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_POST_START,
  };
};

export const fetchFriendsPostSuccess = (posts, count) => {
  return {
    type: actionTypes.FETCH_FRIENDS_POST_SUCCESS,
    posts,
    count,
  };
};

export const fetchFriendsPostFailed = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_POST_FAILED,
  };
};

export const clearPosts = () => {
  return {
    type: actionTypes.CLEAR_POSTS,
  };
};

export const fetchFriendsPost = (page, limit) => {
  return (dispatch) => {
    dispatch(fetchFriendsPostStart());
    axios
      .get(`/api/posts/friends-post?page=${page}&limit=${limit}`)
      .then((res) => {
        dispatch(fetchFriendsPostSuccess(res.data.posts, res.data.count));
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(fetchFriendsPostFailed());
      });
  };
};

export const likePostSuccess = (likes, likeAction) => {
  return {
    type: actionTypes.LIKER_POST,
    likes,
    likeAction
  };
};

export const likePost = (postId, data) => {
  return (dispatch) => {
    axios.patch(`/api/posts/like-status/${postId}`, data)
    .then(res => {
      dispatch(likePostSuccess(res.data.likes, res.data.likeAction))
    })
    .catch(err => dispatch(errorCreator(err.response)));
  };
};
