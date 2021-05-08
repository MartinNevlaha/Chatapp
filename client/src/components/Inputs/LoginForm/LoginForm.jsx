import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import classes from "./LoginForm.module.scss";
import Card from "../../UI/Card/Card";
import SignIn from "./SignIn/SignIn";
import Register from "./Register/Register";
import Spinner from "../../UI/Spinner/Spinner";

const LoginForm = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const loading = useSelector((state) => state.userAuth.loading);
  const registered = useSelector((state) => state.userAuth.registered);
  const { t } = useTranslation();

  const handleTogleSignMode = (mode) => {
    let sign;
    if (mode === "up") {
      sign = true;
    } else {
      sign = false;
    }
    setIsSignUp(sign);
  };

  return (
    <Card type="small_card">
      <div className={classes.login_wrapper}>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className={classes.login_wrapper_head}>
              <div
                className={
                  isSignUp
                    ? [classes.login_wrapper_head_sign, classes.inactive].join(
                        " "
                      )
                    : classes.login_wrapper_head_sign
                }
                onClick={() => handleTogleSignMode("in")}
              >
                {t("login.login")}
              </div>
              <div
                className={
                  isSignUp
                    ? classes.login_wrapper_head_sign
                    : [classes.login_wrapper_head_sign, classes.inactive].join(
                        " "
                      )
                }
                onClick={() => handleTogleSignMode("up")}
              >
                {t("register.register")}
              </div>
            </div>
            {isSignUp ? (
              <Register
                registerUser={props.registerUser}
                registered={registered}
                resetAuth={props.resetAuth}
              />
            ) : (
              <SignIn loginUser={props.loginUser} />
            )}
          </React.Fragment>
        )}
      </div>
    </Card>
  );
};

export default LoginForm;
