import React, { useState } from "react";

import classes from "./deleteAccount.module.scss";
import Button from "../UI/Button/Button";
import RetypeCheck from "./RetypeCheck/RetypeCheck";

export const DeleteAccount = ({ openModal }) => {
  const [isRetypeShow, setIsRetypeShow] = useState(false);
  const [retypeString, setRetypeString] = useState("");
  const [inputString, setInputString] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleClickDelete = () => {
    setIsRetypeShow(true);
    setRetypeString(generateRandomNumbers());
  };
  const generateRandomNumbers = () => {
    let number = Math.floor(100000 + Math.random() * 900000).toString();
    number = number.substring();
    return number;
  };

  const handleInputString = (e) => {
    setInputString(e.target.value);
  };

  const handleAccountDelete = () => {
    if (retypeString === inputString) {
      console.log("delete account");
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={classes.deleteAccount}>
      <h2>Delete your account</h2>
      <div
        className={
          isRetypeShow
            ? [classes.deleteAccount_container, classes.close].join(" ")
            : classes.deleteAccount_container
        }
      >
        <p>You can delete your account here. Just pres delete button</p>
        <Button type="button" danger clicked={handleClickDelete}>
          Delete
        </Button>
      </div>
      <RetypeCheck
        isRetypeShow={isRetypeShow}
        string={retypeString}
        inputValue={inputString}
        changeInput={handleInputString}
        isValid={isValid}
        accountDelete={handleAccountDelete}
      />
    </div>
  );
};

export default DeleteAccount;
