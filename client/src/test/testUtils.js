import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

export const checkProps = (component, conformingProps) => {
  const propsError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propsError).toBeUndefined();
};
