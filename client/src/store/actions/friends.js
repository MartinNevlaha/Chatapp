import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

export const fetchFriendsStart = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_START,
  };
};

export const fetchFriendsSuccess = (friendships) => {
  return {
    type: actionTypes.FETCH_FRIENDS_SUCCESS,
    friendships,
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
      const friends = res.data.friendships.map(friendship => {
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