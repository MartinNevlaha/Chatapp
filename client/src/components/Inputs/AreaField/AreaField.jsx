import React from "react";
import { useField, ErrorMessage } from "formik";

import classes from "./AreaField.module.scss";

export const AreaField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={classes.textArea}>
      <textarea
        name="textArea"
        cols="30"
        rows="10"
        maxLength="256"
        {...field}
        {...props}
      ></textarea>
      <ErrorMessage
        component="div"
        style={{ color: "red", fontSize: ".8rem", padding: ".5rem" }}
        name={field.name}
      />
    </div>
  );
};

export default AreaField;
