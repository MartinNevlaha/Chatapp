import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  userId: null,
  firstName: "",
  lastName: "",
  role: "",
  token: null,
};

const registerSucces = (state, action) => {
  const { userId, firstName, lastName, role } = action.decodedToken;
  return updateObj(state, {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    role: role,
    token: action.token,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return registerSucces(state, action);
    default:
      return state;
  }
};

export default reducer;
