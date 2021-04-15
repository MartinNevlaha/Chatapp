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
  const updateFriendship = [...state.friends];
  action.friends.forEach((onlineFriend) => {
    const index = updateFriendship.findIndex(
      (friendship) => friendship.id === onlineFriend
    );
    const updatedObj = {
      ...updateFriendship[index],
      friend: {
        ...updateFriendship[index].friend,
        online: true,
      },
    };
    updateFriendship[index] = updatedObj;
  });
  return updateObj(state, { friends: updateFriendship });
};

const friendOffline = (state, action) => {
  const index = state.friends.findIndex(
    (friendship) => (friendship.id = action.friend)
  );
  return updateArray(state, {
    friends: {
      [index]: {
        friend: {
          ...state.friends[index].friend,
          online: { $set: false },
        }
      },
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
