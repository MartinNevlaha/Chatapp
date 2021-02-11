import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
          <h1>Please Sign Up</h1>
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
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
