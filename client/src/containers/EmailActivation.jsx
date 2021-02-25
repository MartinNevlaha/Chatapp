import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import EmailActiv from "../components/EmailActivation/EmailActivation";
import * as action from "../store/actions";

const EmailActivation = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userAuth.loading);

  const handleactivated = (token) => {
    dispatch(action.emailActivation(token));
  };

  return (
    <div>
      <EmailActiv loading={loading} activation={handleactivated} />
    </div>
  );
};

export default withRouter(EmailActivation);
