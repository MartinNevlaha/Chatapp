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
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(percentCompleted);
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }
  return (dispatch) => {
    console.log(postData);
    dispatch(createPostStart());
    axios
      .post("/api/posts/create", postData, config)
      .then(res => {
        dispatch(createPostSuccess(res.data.post))
      })
      .catch((err) => {
        dispatch(errorCreator(err.response));
        dispatch(createPostFailed());
      });
  };
};


