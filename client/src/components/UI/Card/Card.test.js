import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import Card from "./Card";

const defaultProps = {
  type: "small-card",
  children: <p>render something</p>,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Card {...props} />);
};
