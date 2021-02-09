import React from "react";

import classes from "./LoginForm.module.scss";
import Card from "../../UI/Card/Card";
import SignIn from "./SignIn/SignIn";

const LoginForm = () => {
  return (
    <Card type="small_card">
      <div className={classes.login_wrapper}>
        <div className={classes.login_wrapper_head}>
          <div className={classes.login_wrapper_head_sign}>SignIn</div>
          <div
            className={[classes.login_wrapper_head_sign, classes.inactive].join(
              " "
            )}
          >
            SignUp
          </div>
        </div>
        <SignIn />
      </div>
    </Card>
  );
};

export default LoginForm;
