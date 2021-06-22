import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../store/reducers";
import { midlewares } from "../store";

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...midlewares));
}

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

export const checkProps = (component, conformingProps) => {
  const propsError = checkPropTypes(component.propTypes, conformingProps, "prop", component.name);
  expect(propsError).toBeUndefined();
}
