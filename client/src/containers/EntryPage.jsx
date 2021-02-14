import React from "react";
import { useDispatch } from "react-redux";

import LoginForm from "../components/Inputs/LoginForm/LoginForm";
import * as action from "../store/actions/index";

const EntryPage = () => {
  const dispatch = useDispatch();

  const handleRegisterUser = (userData) => {
    dispatch(action.registerUser(userData));
  };
  const handleLoginUser = (userData) => {
    dispatch(action.loginUser(userData));
  };
  const handlerResetAuth = () => {
    dispatch(action.resetAuth())
  }
  return (
    <div>
      <LoginForm
        registerUser={handleRegisterUser}
        loginUser={handleLoginUser}
        resetAuth={handlerResetAuth}
      />
    </div>
  );
};

export default EntryPage;
