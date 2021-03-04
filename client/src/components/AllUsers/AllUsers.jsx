import React from "react";

import classes from "./AllUsers.module.scss";

const dummyUsers = [
  {
    id: 1,
    fullName: "Martin Nevlaha",
    online: false,
    status: "Iba toto sem napisem asd afdfsdfdsfasdfdsfsdafsd",
    avatar: "http://localhost:8000/users/1/avatar_1614872484071a5e712aa-aa8e-41d1-b0df-58a3250e2e3c.png",
  },
  {
    id: 2,
    fullName: "Ignac Mrkva",
    online: true,
    status: "A ja zase toto",
    avatar: "http://localhost:8000/users/1/avatar_1614872484071a5e712aa-aa8e-41d1-b0df-58a3250e2e3c.png",
  },
];

const AllUsers = () => {
  return (
    <div className={classes.users_container}>
      <div className={classes.users_container_header}>
        <h2>All users</h2>
      </div>
      <div className={classes.users_container_content}>
        {dummyUsers.map((user) => {
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
        })}
      </div>
    </div>
  );
};

export default AllUsers;
