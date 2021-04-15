import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

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

export const friendsOnline = (friends) => {
  return {
    type: actionTypes.FRIEND_ONLINE,
    friends,
  }
}

export const friendOffline = (friend) => {
  return {
    type: actionTypes.FRIEND_OFFLINE,
    friend,
  }
}

