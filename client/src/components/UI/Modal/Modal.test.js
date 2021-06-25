import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import Modal from "./Modal";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";

const mockClick = jest.fn();
const defaultProps = {
  show: false,
  cancel: mockClick,
  loading: false,
  children: <p>render something</p>,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<Modal {...setupProps} />);
};

test("should renders backdrop componet without error", () => {
  const wrapper = setup();
  expect(wrapper.find(Backdrop)).toHaveLength(1);
});

describe("test component when show prop is false", () => {
  test("shouldnt render modal div element", () => {
    const wrapper = setup();
    const modal = findByTestAttr(wrapper, "component-modal");
    expect(modal.exists()).toBe(false);
  });
});

describe("test component when show prop is true and loading prop is false", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      show: true,
    });
  });

  test("should render modal div element", () => {
    const modal = findByTestAttr(wrapper, "component-modal");
    expect(modal.exists()).toBe(true);
  });

  test("should render modal content element div", () => {
    const modalContent = findByTestAttr(wrapper, "modal-content");
    expect(modalContent.exists()).toBe(true);
  });

  test("should render children prop", () => {
    const modalContent = findByTestAttr(wrapper, "modal-content");
    expect(
      modalContent.containsMatchingElement(<p>render something</p>)
    ).toEqual(true);
  });

  test("should not render Spinner component", () => {
    const modal = findByTestAttr(wrapper, "component-modal");
    expect(modal.find(Spinner)).toHaveLength(0);
  });
});

describe("test component when show prop is true and loading prop is true", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      show: true,
      loading: true,
    });
  });

  test("should render modal div element", () => {
    const modal = findByTestAttr(wrapper, "component-modal");
    expect(modal.exists()).toBe(true);
  });

  test("should render Spinner component", () => {
    const modal = findByTestAttr(wrapper, "component-modal");
    expect(modal.find(Spinner)).toHaveLength(1);
  });
});
