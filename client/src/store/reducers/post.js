import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";


const initialState = {
  posts: [],
  count: 0,
  loading: false,
  uploadStatus: 0,
};

const createPostStart = (state, action) => {
  return updateObj(state, {
    loading: true,
  });
};

const createPostSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    posts: [...state.posts, action.post],
  });
};

const createPostFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const fetchFriendsPostStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchFriendsPostSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    count: action.count,
    posts: action.posts,
  });
};

const fetchFriendsPostFailed = (state, action) => {
  return updateObj(state, {
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST_START:
      return createPostStart(state, action);
    case actionTypes.CREATE_POST_SUCCESS:
      return createPostSuccess(state, action);
    case actionTypes.CREATE_POST_FAILED:
      return createPostFailed(state, action);
    case actionTypes.FETCH_FRIENDS_POST_START:
      return fetchFriendsPostStart(state, action);
    case actionTypes.FETCH_FRIENDS_POST_SUCCESS:
      return fetchFriendsPostSuccess(state, action);
    case actionTypes.FETCH_FRIENDS_POST_FAILED:
      return fetchFriendsPostFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
