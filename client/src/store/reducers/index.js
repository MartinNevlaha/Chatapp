import { combineReducers } from "redux";

import userAuthReducer from "./userAuth";
import requestStatusReducer from "./requestStatus";
import userProfileReducer from "./userProfile";
import usersReducer from "./users";
import friendRequestReducer from "./friendRequest";
import friendsReducer from "./friends";
import postReducer from "./post";
import userInfoReducer from "./userInfo";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  requestStatus: requestStatusReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  users: usersReducer,
  friendRequest: friendRequestReducer,
  friends: friendsReducer,
  posts: postReducer,
  userInfo: userInfoReducer,
  chat: chatReducer
});

export default rootReducer;
