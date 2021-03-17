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
        console.log(res.data.requests);
        dispatch(fetchFriendRequestSuccess(res.data.requests));
      })
      .catch((err) => {
        dispatch(fetchFriendRequestFailed());
        dispatch(errorCreator(err.response));
      });
  };
};
