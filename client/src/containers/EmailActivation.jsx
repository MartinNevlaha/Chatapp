import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import EmailActiv from "../components/EmailActivation/EmailActivation";
import * as action from "../store/actions";

const EmailActivation = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userAuth.loading);

  const handleactivated = (token, history) => {
    dispatch(action.emailActivation(token, history));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmailActiv loading={loading} activation={handleactivated} />
    </div>
  );
};

export default withRouter(EmailActivation);
