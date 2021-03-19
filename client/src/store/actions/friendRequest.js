import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator, successCreator } from "./requestStatus";

export const fetchFriendRequestStart = () => {
  return {
    type: actionTypes.FETCH_FRIEND_REQUEST_START,
  };
};

export const fetchFriendRequestSuccess = (requests) => {
  return {
    type: actionTypes.FETCH_FRIEND_REQUEST_SUCCES,
    requests,
  };
};

export const fetchFriendRequestFailed = () => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_FAILED,
  };
};

export const fetchFriendRequest = () => {
  return (dispatch) => {
    dispatch(fetchFriendRequestStart());
    axios
      .get("/api/friendship")
      .then((res) => {
        dispatch(fetchFriendRequestSuccess(res.data.requests));
      })
      .catch((err) => {
        dispatch(fetchFriendRequestFailed());
        dispatch(errorCreator(err.response));
      });
  };
};

export const answerFriendRequestStart = () => {
  return {
    type: actionTypes.ANSWER_FRIEND_REQUEST_START,
  };
};

export const answerFriendRequestSuccess = (requestId) => {
  return {
    type: actionTypes.ANSWER_FRIEND_REQUEST_SUCCESS,
    requestId,
  };
};

export const answerFriendRequestFailed = () => {
  return {
    type: actionTypes.ANSWER_FRIEND_REQUEST_FAILED,
  };
};

export const answerFriendRequest = (requestId, answer) => {
  return dispatch => {
    dispatch(answerFriendRequestStart());
    axios.put(`/api/friendship/${requestId}`, answer)
    .then(res => {
      dispatch(successCreator(res.data.message));
      dispatch(answerFriendRequestSuccess(res.data.answer.id));
    })
    .catch(err => {
      dispatch(answerFriendRequestFailed());
      dispatch(errorCreator(err.response));
    })
  }
}
