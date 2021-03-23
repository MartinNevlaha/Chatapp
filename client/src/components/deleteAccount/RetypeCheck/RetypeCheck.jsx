import React from "react";

import classes from "./RetypeCheck.module.scss";
import Button from "../../UI/Button/Button";

export const RetypeCheck = ({
  isRetypeShow,
  string,
  inputValue,
  changeInput,
  isValid,
  accountDelete
}) => {
  return (
    <div
      className={
        isRetypeShow
          ? [classes.retypeCheck, classes.open].join(" ")
          : classes.retypeCheck
      }
    >
      <div className={classes.retypeCheck_content}>
        <h3>Please retype this number {string}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => changeInput(e)}
        />
      </div>
      {isValid === false && <p>Entered number do not match!</p>}
      <Button clicked={accountDelete}>Ok</Button>
    </div>
  );
};

export default RetypeCheck;
