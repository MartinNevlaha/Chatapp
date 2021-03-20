import React from "react";

import classes from "./AllFriends.module.scss";
import Spinner from "../UI/Spinner/Spinner";

const AllFriends = ({friendships, loading}) => {

  const friendsContent = friendships.map((friendship) => {
    return (
      <div key={friendship.id} className={classes.friend_container}>
        <div className={classes.friend_container_avatar}>
          <img src={friendship.friend.avatar} alt="avatar" />
        </div>
        <div className={classes.friend_container_info}>
          <div className={classes.friend_container_info_indicator}>
            <p>{friendship.friend.fullName}</p>
            <span
              className={
                !friendship.friend.online
                  ? classes.dot
                  : [classes.dot, classes.online].join(" ")
              }
            ></span>
          </div>
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
