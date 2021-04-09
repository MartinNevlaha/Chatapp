import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

import { friendStatus } from "../../config/friendStatus";

const initialState = {
  userInfo: {},
  userFriends: [],
  isFriend: null,
  loading: false,
  loadingPost: false,
  loadingFriends: false,
};

const getUserInfoStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const getUserInfoSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    userInfo: action.userInfo,
    isFriend: action.isFriend,
  });
};

const getUserInfoFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const addUserOnInfoPage = (state, action) => {
  return updateObj(state, {
    ...state.userInfo,
    isFriend: friendStatus.pending,
  });
};

const getUserFriendsStart = (state, action) => {
  return updateObj(state, { loadingFriends: true });
};

const getUserFriendsSuccess = (state, action) => {
  return updateObj(state, {
    loadingFriends: false,
    userFriends: action.friendsList,
  });
};

const getUserFriendsFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO_START:
      return getUserInfoStart(state, action);
    case actionTypes.GET_USER_INFO_SUCCESS:
      return getUserInfoSuccess(state, action);
    case actionTypes.GET_USER_INFO_FAILED:
      return getUserInfoFailed(state, action);
    case actionTypes.ADD_USER_ON_INFO_PAGE:
      return addUserOnInfoPage(state, action);
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