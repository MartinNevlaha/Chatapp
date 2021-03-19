import { combineReducers } from "redux";

import userAuthReducer from "./userAuth";
import requestStatusReducer from "./requestStatus";
import userProfileReducer from "./userProfile";
import usersReducer from "./users";
import friendRequestReducer from "./friendRequest";
import friendsReducer from "./friends";

const rootReducer = combineReducers({
  requestStatus: requestStatusReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  users: usersReducer,
  friendRequest: friendRequestReducer,
  friends: friendsReducer
});

export default rootReducer;
