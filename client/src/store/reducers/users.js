import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  users: [],
  count: null,
  loading: false,
};

const fetchActiveUsersStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchActiveUsersSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    users: action.users,
    count: action.totalRecordsInDb,
  });
};

const fetchActiveUsersFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const addFriendStart = (state, action) => {
  const index = state.users.findIndex(user => user.id === action.recipient);
  return updateArray(state, {
    users: {
      [index]: {
        loadingAddFriend: {$set: true}
      }
    }
  })
};

const addFriendSuccess = (state, action) => {
  const index = state.users.findIndex(user => user.id === action.recipient);
  return updateArray(state, {
    users: {
      [index]: {
        friendStatus: {$set: action.status},
        loadingAddFriend: {$set: false}
      }
    }
  })
};

const addFriendFailed = (state, action) => {
  const index = state.users.findIndex(user => user.id === action.recipient);
  return updateArray(state, {
    users: {
      [index]: {
        loadingAddFriend: {$set: false}
      }
    }
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVE_USERS_START:
      return fetchActiveUsersStart(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_SUCCESS:
      return fetchActiveUsersSuccess(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_FAILED:
      return fetchActiveUsersFailed(state, action);
    case actionTypes.ADD_FRIEND_START:
      return addFriendStart(state, action);
    case actionTypes.ADD_FRIEND_SUCCESS:
      return addFriendSuccess(state, action);
    case actionTypes.ADD_FRIEND_FAILED:
      return addFriendFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
