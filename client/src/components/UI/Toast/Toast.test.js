import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Toast from "./Toast";

const defaultProps = {
  isShow: false,
  message: "something",
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Toast {...setupProps} />);
};

test("should renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-toast");
  expect(component.length).toBe(1);
});

test("should render message props as text", () => {
  const wrapper = setup();
  const text = findByTestAttr(wrapper, "message");
  expect(text.text()).toBe("something");
});

describe("css class testing", () => {
  let wrapper;
  let toast;
  beforeEach(() => {
    wrapper = setup();
    toast = findByTestAttr(wrapper, "component-toast");
  });
  test("should component has default css class toast", () => {
    expect(toast.hasClass("toast")).toEqual(true);
  });

  test("should component has css class showed when isShow prop is true", () => {
    const wrapper = setup({ isShow: true });
    const toast = findByTestAttr(wrapper, "component-toast");
    expect(toast.hasClass("showed")).toEqual(true);
  });

  test("should not component has css class showed when isShow prop is false", () => {
    expect(toast.hasClass("showed")).toEqual(false);
  });
});

test("check prop types", () => {
  checkProps(Toast, defaultProps);
});
