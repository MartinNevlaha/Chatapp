import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import LazyImage from "./LazyImage";

const defaultProps = {
  image: {
    alt: "image",
    src: "http://localhost:3000/image.jpg",
  },
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<LazyImage {...setupProps} />);
};

let wrapper;

beforeEach(() => {
  wrapper = setup();
});

test("renders without error", () => {
  const component = findByTestAttr(wrapper, "component-lazyImg");
  expect(component.length).toBe(1);
});

test("renders LazyLoadImage", () => {
  const component = findByTestAttr(wrapper, "lazyImg");
  expect(component.exists()).toBe(true);
});

test("check propsTypes", () => {
  checkProps(LazyImage, defaultProps);
});
