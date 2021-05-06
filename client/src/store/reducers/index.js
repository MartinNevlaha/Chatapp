import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionTypes";

import userAuthReducer from "./userAuth";
import requestStatusReducer from "./requestStatus";
import userProfileReducer from "./userProfile";
import usersReducer from "./users";
import friendRequestReducer from "./friendRequest";
import friendsReducer from "./friends";
import postReducer from "./post";
import userInfoReducer from "./userInfo";
import chatReducer from "./chat";
import videoCallReducer from "./videoCall";

const combineReducer = combineReducers({
  requestStatus: requestStatusReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  users: usersReducer,
  friendRequest: friendRequestReducer,
  friends: friendsReducer,
  posts: postReducer,
  userInfo: userInfoReducer,
  chat: chatReducer,
  videoCall: videoCallReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return combineReducer(state, action);
};

export default rootReducer;
