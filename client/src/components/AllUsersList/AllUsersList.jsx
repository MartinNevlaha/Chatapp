import React from "react";

import classes from "./AllUsersList.module.scss";

const AllUsersList = () => {
  return <div className={classes.users}>
    <div className={classes.users_header}>
      <h2>List of Users</h2>
    </div>
  </div>;
};

export default AllUsersList;
