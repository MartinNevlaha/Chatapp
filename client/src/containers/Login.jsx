import React from "react";
import { useDispatch } from "react-redux";

import LoginForm from "../components/Inputs/LoginForm/LoginForm";
import EntryImg from "../components/UI/EntryImg/EntryImg";
import * as action from "../store/actions/index";

const EntryPage = () => {
  const dispatch = useDispatch();

  const handleRegisterUser = (userData) => {
    dispatch(action.registerUser(userData));
  };
  const handleLoginUser = (userData, history) => {
    dispatch(action.loginUser(userData, history));
  };
  const handlerResetAuth = () => {
    dispatch(action.resetAuth());
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap"
      }}
    >
      <EntryImg />
      <LoginForm
        registerUser={handleRegisterUser}
        loginUser={handleLoginUser}
        resetAuth={handlerResetAuth}
      />
    </div>
  );
};

export default EntryPage;
