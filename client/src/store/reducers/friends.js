import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  userFriends: [],
  loading: false,
};

const getUserFriendsStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const getUserFriendsSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    userFriends: action.friendsList,
  });
};

const getUserFriendsFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const friendsOnline = (state, action) => {
  const updateFriends = [...state.userFriends];
  action.friends.forEach((onlineFriend) => {
    const index = updateFriends.findIndex(
      (friend) => friend.id === onlineFriend
    );
    if (index !== -1) {
      updateFriends[index].status = "online";
    }
  });
  return updateObj(state, { userFriends: updateFriends });
};

const friendOffline = (state, action) => {
  const index = state.userFriends.findIndex(
    (friend) => (friend.id === action.friend)
  );
  return updateArray(state, {
    userFriends: {
      [index]: { status: { $set: "offline" } },
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FRIEND_ONLINE:
      return friendsOnline(state, action);
    case actionTypes.FRIEND_OFFLINE:
      return friendOffline(state, action);
    case actionTypes.GET_USER_FRIENDS_START:
      return getUserFriendsStart(state, action);
    case actionTypes.GET_USER_FRIENDS_SUCCESS:
      return getUserFriendsSuccess(state, action);
    case actionTypes.GET_USER_FRIENDS_FAILLED:
      return getUserFriendsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
