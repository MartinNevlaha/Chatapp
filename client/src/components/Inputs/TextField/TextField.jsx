import React from 'react';
import { useField, ErrorMessage } from "formik";

import classes from "./TextField.module.scss";

const TextField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={classes.textField}>
            <label htmlFor={field.name}>{label}</label>
            <input className={classes.textField_input} 
            autoComplete="off" 
            {...field} 
            {...props}/>
            <ErrorMessage component="div" className={classes.error} name={field.name}/>
        </div>
    )
}

export default TextField
