import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import config from "../config/app";

import rootReducer from "./reducers";

const composeEnhancers =
  config.envDepl === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;