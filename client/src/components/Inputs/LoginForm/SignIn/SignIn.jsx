import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import classes from "./LoginForm.module.scss";
import TextField from "../../TextField/TextField";

const LoginForm = () => {
    const validate = Yup.object({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string().min(5, "Min lenght of password is 5 characters").required("Password is required")
    })

    return (
        <Formik
        initialValues={{
            email: "",
            password: ""
        }}
        validationSchema={validate}
        onSubmit={data => console.log(data)}
        >
        {() => (
            <div>
                <h1 className="title">Login</h1>
                <Form>
                    <TextField label="Email" name="email" type="email" />
                    <TextField label="Password" name="password" type="password" />
                    <button type="submit">Login</button>
                </Form>
            </div>
        )}
        </Formik>
    )
}

export default LoginForm;
