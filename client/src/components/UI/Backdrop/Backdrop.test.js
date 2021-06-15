import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import Backdrop from "./Backdrop";

const defaultProps = {
  show: true,
  children: <p>render something</p>,
};
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Backdrop {...setupProps} />);
};

describe("renders without error", () => {
  test("renders null when show prop is false", () => {
    const wrapper = setup({ show: false });
    const component = findByTestAttr(wrapper, "component-backdrop");
    expect(component.length).toBe(0);
  });

  test("should renders div when show prop is true", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-backdrop");
    expect(component.length).toBe(1);
  });
});

test("should renders children prop", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-backdrop");
  expect(component.containsMatchingElement(<p>render something</p>)).toEqual(true);
});

test("check props types", () => {
  checkProps(Backdrop, defaultProps);
})