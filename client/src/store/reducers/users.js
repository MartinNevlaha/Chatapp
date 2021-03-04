import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  users: [],
  loading: false,
};

const fetchActiveUsersStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchActiveUsersSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    users: action.users,
  });
};

const fetchActiveUsersFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const usersOnline = (state, action) => {
  const updateUsers = [...state.users];
  action.users.forEach((onlineUser) => {
    const index = updateUsers.findIndex((user) => user.id === onlineUser);
    const updatedObj = { ...updateUsers[index] };
    updatedObj.online = true;
    updateUsers[index] = updatedObj;
  });
  return updateObj(state, { users: updateUsers });
};

const userOffline = (state, action) => {
  const index = state.users.findIndex((user) => user.id === action.user);
  return updateArray(state, {
    users: {
      [index]: {
        online: { $set: false },
      },
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVE_USERS_START:
      return fetchActiveUsersStart(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_SUCCESS:
      return fetchActiveUsersSuccess(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_FAILED:
      return fetchActiveUsersFailed(state, action);
    case actionTypes.USERS_ONLINE:
      return usersOnline(state, action);
    case actionTypes.USERS_OFFLINE:
      return userOffline(state, action);
    default:
      return state;
  }
};

export default reducer;
