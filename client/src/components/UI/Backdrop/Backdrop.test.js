import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../../../test/testUtils";
import Backdrop from "./Backdrop";

const defaultProps = {
  show: false,
  children: <p>render something</p>,
};
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Backdrop {...setupProps} />);
};
