import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  users: [],
  count: null,
  loading: false,
  loadingAddFriend: false,
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
  return updateObj(state, { loadingAddFriend: true });
};

const addFriendSuccess = (state, action) => {
  return updateObj(state, { loadingAddFriend: false });
};

const addFriendFailed = (state, action) => {
  return updateObj(state, { loadingAddFriend: false });
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
