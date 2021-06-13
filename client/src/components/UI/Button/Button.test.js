import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Button from "./Button";

const defaultProps = {
  children: "Ok",
  clicked: jest.fn(),
};

/**
 * Basic func to create a ShallowWrapper for the Button component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Button {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const btn = findByTestAttr(wrapper, "component-button");
  expect(btn.length).toBe(1);
});

describe("prop types checking", () => {
  test("test required props", () => {
    checkProps(Button, defaultProps);
  });

  test("test optional props", () => {
    const optionalProps = {
      type: "submit",
      disabled: true,
      clicked: jest.fn(),
      children: "Ok",
      danger: false,
    };
    checkProps(Button, optionalProps)
  });
});
