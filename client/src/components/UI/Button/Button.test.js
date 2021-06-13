import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Button from "./Button";

const defaultProps = {
  disabled: false,
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

test('renders without error', () => {
  const wrapper = setup();
  const btn = findByTestAttr(wrapper, "component-button");
  expect(btn.lenght).toBe(1);
})
