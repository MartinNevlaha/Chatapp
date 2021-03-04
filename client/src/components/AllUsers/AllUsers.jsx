import React from "react";
import {useSelector} from "react-redux";

import classes from "./AllUsers.module.scss";
import Spinner from "../UI/Spinner/Spinner";


const AllUsers = ({users}) => {
  const loading = useSelector(state => state.users.loading);

  const usersContent = users.map((user) => {
    return (
      <div key={user.id} className={classes.user_container}>
        <div className={classes.user_container_avatar}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className={classes.user_container_info}>
          <div className={classes.user_container_info_indicator}>
            <p>{user.fullName}</p>
            <span
              className={
                !user.online
                  ? classes.dot
                  : [classes.dot, classes.online].join(" ")
              }
            ></span>
          </div>
          <p className={classes.user_container_info_status}>Status: {user.status}</p>
        </div>
      </div>
    );
  })

  return (
    <div className={classes.users_container}>
      <div className={classes.users_container_header}>
        <h2>All users</h2>
      </div>
      <div className={classes.users_container_content}>
        {loading ? <Spinner /> : usersContent}
      </div>
    </div>
  );
};

export default AllUsers;
