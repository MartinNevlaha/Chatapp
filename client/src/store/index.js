import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import config from "../config/app";

import rootReducer from "./reducers";

export const midlewares = [thunk];

const composeEnhancers =
  config.envDepl === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...midlewares))
);

export default store;