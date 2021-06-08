import { shallow } from "enzyme";

import StatusDot from "./StatusDot";
import { findByTestAttr, checkProps } from "../../../test/testUtils";

const defaultProps = { status: "offline", statusShow: false };
/**
 * Basic func to create a Shallow wrapper for the StatusDot component
 * @function setup
 * @param {*} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<StatusDot {...setupProps} />);
};

test("renders withouth error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-status");
  expect(component.length).toBe(1);
});

test("not renders p element when statusShow prop is false", () => {
  const wrapper = setup();
  const statusParagraph = findByTestAttr(wrapper, "status-message");
  expect(statusParagraph.length).toBe(0);
});

describe("renders paragraph when status show is true", () => {
  test("status prop is online", () => {
    const wrapper = setup({ statusShow: true, status: "online" });
    const p = findByTestAttr(wrapper, "status-message");
    expect(p.text()).toBe("online");
  });

  test("status prop is offline", () => {
    const wrapper = setup({ statusShow: true, status: "offline" });
    const p = findByTestAttr(wrapper, "status-message");
    expect(p.text()).toBe("offline");
  });
});

describe("checked css class based on status prop on span element", () => {
  test("status prop is online", () => {
    const wrapper = setup({ status: "online" });
    const span = findByTestAttr(wrapper, "status-dot");
    expect(span.hasClass("online")).toEqual(true);
  });
  test("status prop is offline", () => {
    const wrapper = setup({ status: "offline" });
    const span = findByTestAttr(wrapper, "status-dot");
    expect(span.hasClass("online")).toEqual(false);
  });
});

test("prop types checking", () => {
  const expectedProps = { status: "offline", statusShow: true };
  checkProps(StatusDot, expectedProps);
});
