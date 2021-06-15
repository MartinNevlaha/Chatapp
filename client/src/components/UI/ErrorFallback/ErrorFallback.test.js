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


