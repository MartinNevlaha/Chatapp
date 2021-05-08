import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "../SignIn/SignIn.module.scss";
import TextField from "../../TextField/TextField";
import Button from "../../../UI/Button/Button";

const Register = (props) => {
  const { t } = useTranslation();

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, t("validation.errNameMax"))
      .required(t("validation.errContent")),
    lastName: Yup.string()
      .max(20, t("validation.errNameMax"))
      .required(t("validation.errContent")),
    email: Yup.string()
      .email(t("validation.errEmailValidity"))
      .required(t("validation.errEmailReq")),
    password: Yup.string()
      .min(6, t("validation.errPassMin"))
      .required(t("validation.errPassReq")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.errConfirmPass"))
      .required(t("validation.errContent")),
  });

  return (
    <React.Fragment>
      {!props.registered ? (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validate}
          onSubmit={(userData) => props.registerUser(userData)}
        >
          {() => (
            <div className={classes.input_container}>
              <h1>{t("register.title")}</h1>
              <Form>
                <TextField
                  label={t("register.firstName")}
                  name="firstName"
                  type="text"
                />
                <TextField
                  label={t("register.lastName")}
                  name="lastName"
                  type="text"
                />
                <TextField label="Email" name="email" type="email" />
                <TextField
                  label={t("register.password")}
                  name="password"
                  type="password"
                />
                <TextField
                  label={t("register.confirmPass")}
                  name="confirmPassword"
                  type="password"
                />
                <Button type="submit">{t("register.register")}</Button>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <div className={classes.input_container}>
          <div className={classes.input_container_iconWrapper}>
            <FontAwesomeIcon
              icon={faUser}
              size="5x"
              className={classes.input_container_iconWrapper_icon}
            />
          </div>
          <h2>{t("register.succesMsg")}</h2>
          <Button clicked={props.resetAuth}>Ok</Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
