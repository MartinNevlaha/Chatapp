import React from "react";
import { useDispatch } from "react-redux";

import LoginForm from "../components/Inputs/LoginForm/LoginForm";

const EntryPage = () => {
  const dispatch = useDispatch();

  const handleRegisterUser = () => {
    
  }

  return <div>
      <LoginForm />
  </div>;
};

export default EntryPage;
