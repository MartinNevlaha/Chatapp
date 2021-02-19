import { combineReducers } from "redux";

import userAuthReducer from "./userAuth";
import requestStatusReducer from "./requestStatus";

const rootReducer = combineReducers({
  requestStatus: requestStatusReducer,
  userAuth: userAuthReducer,
});

export default rootReducer;
