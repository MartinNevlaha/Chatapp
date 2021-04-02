import React from "react";

import classes from "./ShowLikes.module.scss";
import User from "../User/User";

const ShowLikes = ({ showLike }) => {
  return (
    <div>
      <h2>
        People who {showLike.likeType === 1 ? "like" : "dislike"} your post
      </h2>
      <hr/>
      <div className={classes.likes}>
        {showLike.users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default ShowLikes;
