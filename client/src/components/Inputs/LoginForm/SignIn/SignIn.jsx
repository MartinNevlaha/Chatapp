import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import classes from "./SignIn.module.scss";
import TextField from "../../TextField/TextField";
import Button from "../../../UI/Button/Button";

const SignIn = (props) => {
  const { t } = useTranslation();
  const validate = Yup.object({
    email: Yup.string()
      .email(t("validation.errEmailValidity"))
      .required(t("validation.errEmailReq")),
    password: Yup.string()
      .min(5, t("validation.errPassMin"))
      .required(t("validation.errPassReq")),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(data) => props.loginUser(data, props.history)}
    >
      {() => (
        <div className={classes.input_container}>
          <h1>Please Sign In</h1>
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <Button type="submit">Sign In</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withRouter(SignIn);
