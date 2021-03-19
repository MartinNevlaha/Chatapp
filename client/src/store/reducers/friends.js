import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  friends: [],
  loading: false,
}

const fetchFriendsStart = (state, action) => {
  return updateObj(state, {loading: true});
}

const fetchFriendsSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    friends: action.friends
  });
}

const fetchFriendsFailed = (state, action) => {
  return updateObj(state, {loading: false});
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIENDS_START:
      return fetchFriendsStart(state, action);
    case actionTypes.FETCH_FRIENDS_SUCCESS:
      return fetchFriendsSuccess(state, action);
    case actionTypes.FETCH_FRIENDS_FAILED:
      return fetchFriendsFailed(state, action)
    default:
      return state;
  }
}

export default reducer;