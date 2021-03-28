import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  posts: [],
  count: 0,
  loading: false,
  loadingCreatePost: false,
  uploadStatus: 0,
};

const createPostStart = (state, action) => {
  return updateObj(state, {
    loadingCreatePost: true,
  });
};

const createPostSuccess = (state, action) => {
  return updateObj(state, {
    loadingCreatePost: false,
    posts: [action.post, ...state.posts],
  });
};

const createPostFailed = (state, action) => {
  return updateObj(state, { loadingCreatePost: false });
};

const fetchFriendsPostStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchFriendsPostSuccess = (state, action) => {
  const concatedPosts = state.posts.concat(action.posts);
  return updateObj(state, {
    loading: false,
    count: action.count,
    posts: concatedPosts,
  });
};

const fetchFriendsPostFailed = (state, action) => {
  return updateObj(state, {
    loading: false,
  });
};

const clearPosts = (state, action) => {
  return updateObj(state, { posts: [] });
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
    case actionTypes.CLEAR_POSTS:
      return clearPosts(state, action);
    default:
      return state;
  }
};

export default reducer;
