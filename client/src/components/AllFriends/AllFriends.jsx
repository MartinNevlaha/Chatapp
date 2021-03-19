import React from "react";

import classes from "./AllFriends.module.scss";
import Spinner from "../UI/Spinner/Spinner";


const AllFriends = ({friends}) => {

  const friendsContent = friends.map((friend) => {
    return (
      <div key={friend.id} className={classes.friend_container}>
        <div className={classes.friend_container_avatar}>
          <img src={friend.avatar} alt="avatar" />
        </div>
        <div className={classes.friend_container_info}>
          <div className={classes.friend_container_info_indicator}>
            <p>{friend.fullName}</p>
            <span
              className={
                !friend.online
                  ? classes.dot
                  : [classes.dot, classes.online].join(" ")
              }
            ></span>
          </div>
          <p className={classes.friend_container_info_status}>Status: {friend.status}</p>
        </div>
      </div>
    );
  })

  return (
    <div className={classes.friends_container}>
      <div className={classes.friends_container_header}>
        <h2>All friends</h2>
      </div>
      <div className={classes.friends_container_content}>
        {loading ? <Spinner /> : friendsContent}
      </div>
    </div>
  );
};

export default AllFriends;
