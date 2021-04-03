import { combineReducers } from "redux";

import userAuthReducer from "./userAuth";
import requestStatusReducer from "./requestStatus";
import userProfileReducer from "./userProfile";
import usersReducer from "./users";
import friendRequestReducer from "./friendRequest";
import friendshipsReducer from "./friends";
import postReducer from "./post";
import userInfoReducer from "./userInfo";

const rootReducer = combineReducers({
  requestStatus: requestStatusReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  users: usersReducer,
  friendRequest: friendRequestReducer,
  friendships: friendshipsReducer,
  posts: postReducer,
  userInfo: userInfoReducer
});

export default rootReducer;
