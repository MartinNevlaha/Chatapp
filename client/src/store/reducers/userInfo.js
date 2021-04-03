import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  userInfo: {},
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO_START:
      return getUserInfoStart(state, action);
    case actionTypes.GET_USER_INFO_SUCCESS:
      return getUserInfoSuccess(state, action);
    case actionTypes.GET_USER_INFO_FAILED:
      return getUserInfoFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
