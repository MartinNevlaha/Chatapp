import { shallow } from "enzyme";

import { findByTestAttr } from "../../../test/testUtils";
import EntryImg from "./EntryImg";

const setup = () => {
  return shallow(<EntryImg />);
};

test("should renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-entryImg");
  expect(component.length).toBe(1);
});
