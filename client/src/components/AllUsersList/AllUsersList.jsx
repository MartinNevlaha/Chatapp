import React from "react";

import classes from "./AllUsersList.module.scss";

const AllUsersList = ({ users }) => {
  return (
    <div className={classes.users}>
      <div className={classes.users_header}>
        <h2>List of Users</h2>
      </div>
      <div className={classes.users_container}>...users</div>
      <div className={classes.users_footer}>
        <div className={classes.users_footer_pages}>
            <p>Pages: 1 2 3 4 5 6 ...</p>
        </div>
        <div className={classes.users_footer_limit}>
          ...limit per page
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
