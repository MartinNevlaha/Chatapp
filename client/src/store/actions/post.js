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
          Likes: [],
        };
        dispatch(createPostSuccess(post));
      })
      .catch((err) => {
        dispatch(errorCreator(err));
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
        console.log(res.data.posts);
        const updatedData = res.data.posts.map((post) => {
          return {
            ...post,
            editMode: false,
          };
        });
        dispatch(fetchFriendsPostSuccess(updatedData, res.data.count));
      })
      .catch((err) => {
        dispatch(errorCreator(err));
        dispatch(fetchFriendsPostFailed());
      });
  };
};

export const likePostSuccess = (likes, likeAction) => {
  return {
    type: actionTypes.LIKER_POST,
    likes,
    likeAction,
  };
};

export const likePost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/posts/like-status/${postId}`, data)
      .then((res) => {
        dispatch(likePostSuccess(res.data.likes, res.data.likeAction));
      })
      .catch((err) => dispatch(errorCreator(err)));
  };
};

export const deletePostStart = () => {
  return {
    type: actionTypes.DELETE_POST_START,
  };
};

export const deletePostSuccess = (postId) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    postId,
  };
};

export const deletePostFailed = () => {
  return {
    type: actionTypes.DELETE_POST_FAILED,
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    dispatch(deletePostStart());
    axios
      .delete(`/api/posts/delete/${postId}`)
      .then((res) => {
        dispatch(deletePostSuccess(postId));
      })
      .catch((err) => {
        dispatch(errorCreator(err));
        dispatch(deletePostFailed());
      });
  };
};

export const setEditMode = (postId) => {
  return {
    type: actionTypes.SET_EDIT_MODE,
    postId,
  };
};

export const deletePostImage = (postId) => {
  return {
    type: actionTypes.DELETE_POST_IMAGE,
    postId,
  };
};

export const updatePostStart = () => {
  return {
    type: actionTypes.UPDATE_POST_START,
  };
};

export const updatePostSuccess = (updatedPost) => {
  return {
    type: actionTypes.UPDATE_POST_SUCCESS,
    updatedPost,
  };
};

export const updatePostFailed = () => {
  return {
    type: actionTypes.UPDATE_POST_FAILED,
  };
};

export const updatePost = (postId, data) => {
  return (dispatch) => {
    dispatch(updatePostStart());
    axios
      .put(`/api/posts/update/${postId}`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        dispatch(updatePostSuccess(res.data.post));
      })
      .catch((err) => {
        dispatch(updatePostFailed());
        dispatch(errorCreator(err));
      });
  };
};


