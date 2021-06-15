import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import Card from "./Card";

const defaultProps = {
  children: <p>render something</p>,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Card {...setupProps} />);
};

test("should renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-card");
  expect(component.length).toBe(1);
});

test("should renders children prop", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-card");
  expect(component.containsMatchingElement(<p>render something</p>)).toEqual(
    true
  );
});

describe("css class check", () => {
  test("basic css class", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-card");
    expect(component.hasClass("card_wrapper")).toEqual(true);
  });

  test("when type props is small_card element has css class small_card", () => {
    const wrapper = setup({ type: "small_card" });
    const component = findByTestAttr(wrapper, "component-card");
    expect(component.hasClass("small_card")).toEqual(true);
  });
});

describe("check propTypes", () => {
  test("check default propTypes", () => {
    checkProps(Card, defaultProps);
  });
  test("check optional propTypes", () => {
    checkProps(Card, { type: "small_card", children: <p>render something</p> });
  });
});
