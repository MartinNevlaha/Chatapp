import React from 'react';
import { useField, ErrorMessage } from "formik";

import classes from "./TextField.module.scss";

const TextField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={classes.textField}>
            <div className={classes.textField_wrapper}>
            <label htmlFor={field.name}>{label}</label>
            <input className={classes.textField_input} 
            autoComplete="off" 
            placeholder={field.name}
            {...field} 
            {...props}/>
            <ErrorMessage component="div" style={{color:"red", fontSize: ".8rem", padding: ".5rem"}} name={field.name}/>
            </div>
        </div>
    )
}

export default TextField
