import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  posts: [],
  loading: false,
  uploadStatus: 0,
};

const createPostStart = (state, action) => {
  return updateObj(state, {
    loading: true,
  });
};

const createPostSuccess = (state, action) => {
  console.log(action.post);
  const oldPosts = [...state.posts];
  const updatedPosts = oldPosts.concat(action.post);
  return updateObj(state, { loading: false, posts: updatedPosts });
};

const createPostFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST_START:
      return createPostStart(state, action);
    case actionTypes.CREATE_POST_SUCCESS:
      return createPostSuccess(state, action);
    case actionTypes.CREATE_POST_FAILED:
      return createPostFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
