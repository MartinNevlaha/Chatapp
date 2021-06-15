import { mount } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import ErrorFallback from "./ErrorFallback";

const mockResetErrorBoundary = jest.fn();
const defaultProps = {
  error: {
    message: "Something went wrong",
  },
  resetErrorBoundary: mockResetErrorBoundary,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<ErrorFallback {...setupProps} />);
};

let wrapper;
beforeEach(() => {
  wrapper = setup();
});

test("should renders without error", () => {
  const component = findByTestAttr(wrapper, "component-error");
  expect(component.length).toBe(1);
});

test("click on btn call reserErrorBoundary function", () => {
  const btn = findByTestAttr(wrapper, "component-btn");
  btn.simulate("click");
  expect(mockResetErrorBoundary).toHaveBeenCalled();
});

test("should renders error message", () => {
  const errorMsg = findByTestAttr(wrapper, "component-errorMessage");
  expect(errorMsg.text()).toBe("Something went wrong");
});

test("check propTypes", () => {
  checkProps(ErrorFallback, defaultProps);
});
