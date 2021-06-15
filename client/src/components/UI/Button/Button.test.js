import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Button from "./Button";

const mockClickEvent = jest.fn();
const defaultProps = {
  children: "Ok",
  clicked: mockClickEvent,
};

/**
 * Basic func to create a ShallowWrapper for the Button component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<Button {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});

describe("Test onClick btn function", () => {
  test("click btn when disabled prop is not provided", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "component-button");
    btn.simulate("click");
    expect(mockClickEvent).toHaveBeenCalledTimes(1);
  });
  
  test("click btn when disabled is false", () => {
    const wrapper = setup({ clicked: mockClickEvent, disabled: false });
    const btn = findByTestAttr(wrapper, "component-button");
    btn.simulate("click");
    expect(mockClickEvent).toHaveBeenCalledTimes(1);
  });

  test("click btn when disabled is true", () => {
    const wrapper = setup({ clicked: mockClickEvent, disabled: true });
    const btn = findByTestAttr(wrapper, "component-button");
    btn.simulate("click");
    expect(mockClickEvent).toHaveBeenCalledTimes(0);
  });
});

describe("test css class based on props", () => {
  test("Button component has main class btn", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("btn")).toEqual(true);
  });

  test("Button component has not class disabled if disabled prop is not provided", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("disabled")).toEqual(false);
  });

  test("Button component has class disabled if disabled prop is true", () => {
    const wrapper = setup({
      disabled: true,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("disabled")).toEqual(true);
  });

  test("Button component has not class disabled if disabled prop is false", () => {
    const wrapper = setup({
      disabled: false,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("disabled")).toEqual(false);
  });

  test("Button component has class disabled when danger prop is true and disabled is true", () => {
    const wrapper = setup({
      disabled: true,
      danger: true,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("disabled")).toEqual(true);
  });

  test("Button component has not class danger when danger prop is true and disabled is true", () => {
    const wrapper = setup({
      disabled: true,
      danger: true,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("danger")).toEqual(false);
  });

  test("Button component has class danger when danger prop is true and disabled is false", () => {
    const wrapper = setup({
      disabled: false,
      danger: true,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("danger")).toEqual(true);
  });

  test("Button component has not class disabled when danger prop is true and disabled is false", () => {
    const wrapper = setup({
      disabled: false,
      danger: true,
    });
    const btn = findByTestAttr(wrapper, "component-button");
    expect(btn.hasClass("disabled")).toEqual(false);
  });
});

test("renders children text component", () => {
  const wrapper = setup();
  const btn = findByTestAttr(wrapper, "component-button");
  expect(btn.text()).toEqual("Ok")
})

describe("prop types checking", () => {
  test("test required props", () => {
    checkProps(Button, defaultProps);
  });

  test("test optional props", () => {
    const optionalProps = {
      type: "submit",
      disabled: true,
      clicked: mockClickEvent,
      children: "Ok",
      danger: false,
    };
    checkProps(Button, optionalProps);
  });
});
