import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import classes from "./TextField.module.scss";

const TextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const [isShow, setIsShow] = useState(false);

  const handleTogleShowPwd = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={classes.textField}>
      <div className={classes.textField_wrapper}>
        <label htmlFor={field.name}>{label}</label>
        <input
          className={classes.textField_input}
          autoComplete="off"
          placeholder={field.name}
          type={field.name && isShow  ? "text" : type}
          {...field}
          {...props}
        />
        {(field.name === "password" || field.name === "confirmPassword") && (
          <FontAwesomeIcon
            icon={isShow ? faEyeSlash : faEye}
            className={classes.icon}
            cursor="pointer"
            onClick={handleTogleShowPwd}
          />
        )}

        <ErrorMessage
          component="div"
          style={{ color: "red", fontSize: ".8rem", padding: ".5rem" }}
          name={field.name}
        />
      </div>
    </div>
  );
};

export default TextField;
