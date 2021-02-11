import React from "react";
import { useDispatch } from "react-redux";

import LoginForm from "../components/Inputs/LoginForm/LoginForm";
import * as action from "../store/actions/index";

const EntryPage = () => {
  const dispatch = useDispatch();

  const handleRegisterUser = (userData) => {
    dispatch(action.registerOrLoginUser(userData, "register"));
  };
  const handleLoginUser = (userData) => {
    dispatch(action.registerOrLoginUser(userData, "login"));
  };
  return (
    <div>
      <LoginForm
        registerUser={handleRegisterUser}
        loginUser={handleLoginUser}
      />
    </div>
  );
};

export default EntryPage;
