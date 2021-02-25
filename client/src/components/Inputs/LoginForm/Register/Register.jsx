import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "../SignIn/SignIn.module.scss";
import TextField from "../../TextField/TextField";
import Button from "../../../UI/Button/Button";

const SignUp = (props) => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
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
              <h1>Please Register</h1>
              <Form>
                <TextField label="First Name" name="firstName" type="text" />
                <TextField label="Last Name" name="lastName" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                />
                <Button type="submit">Register</Button>
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
          <h2>
            Registered successfully, please wait for activation email.
          </h2>
          <Button clicked={props.resetAuth}>Ok</Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SignUp;
