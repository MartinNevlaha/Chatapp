import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

export const fetchFriendsStart = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_START,
  };
};

export const fetchFriendsSuccess = (friends) => {
  return {
    type: actionTypes.FETCH_FRIENDS_SUCCESS,
    friends,
  };
};

export const fetchFriendsFailed = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_FAILED,
  };
};

export const fetchFriends = () => {
  return dispatch => {
    dispatch(fetchFriendsStart());
    axios.get("/api/friends/")
    .then(res => {
      const friends = res.data.friends.map(friendship => {
        return {
          ...friendship,
          friend: {
            ...friendship.friend,
            online: false
          }
        }
      })
      dispatch(fetchFriendsSuccess(friends))
    })
    .catch(err => {
      dispatch(fetchFriendsFailed());
      dispatch(errorCreator(err.response))
    })
  }
}