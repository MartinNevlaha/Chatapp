import React from 'react'

import classes from "./deleteAccount.module.scss";
import Button from "../UI/Button/Button";

export const DeleteAccount = () => {
  return (
    <div className={classes.deleteAccount}>
      <h2>Delete your account</h2>
      <p>You can delete your account here. Just pres delete button</p>
      <Button type="button" danger>Delete</Button>
    </div>
  )
}
export default DeleteAccount;