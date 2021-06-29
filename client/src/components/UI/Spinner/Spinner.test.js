import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Spinner from "./Spinner";
import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Spinner {...setupProps} />);
};

test("should render without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-spinner");
  expect(component.length).toBe(1);
});

describe("conditional rendiring type of spinner", () => {
  test("should render dotLoader when type prop is non provided", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-spinner");
    expect(component.find(DotLoader)).toHaveLength(1);
  });
  test('should render beatLoader when type prop is beat', () => {
    const wrapper = setup({type: "beat"});
    const component = findByTestAttr(wrapper, "component-spinner");
    expect(component.find(BeatLoader)).toHaveLength(1);
  })
  
});

test("props checking", () => {
  checkProps(Spinner, defaultProps);
});
