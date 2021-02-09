import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import classes from "./SignIn.module.scss";
import TextField from "../../TextField/TextField";
import Button from "../../../UI/Button/Button";

const SignIn = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(5, "Min lenght of password is 5 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(data) => console.log(data)}
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

export default SignIn;
