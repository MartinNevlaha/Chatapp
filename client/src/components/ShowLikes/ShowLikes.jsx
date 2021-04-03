import React from "react";

import classes from "./ShowLikes.module.scss";
import User from "../User/User";

const ShowLikes = ({ showLike }) => {
  return (
    <div className={classes.likes}>
      <h2>
        People who {showLike.likeType === 1 ? "like" : "dislike"} this post
      </h2>
      <hr/>
      <div className={classes.users}>
        { showLike.users.length > 0 ? showLike.users.map((user) => (
          <User user={user} key={user.id} />
        )) : <p>No like or dislike</p>}
      </div>
    </div>
  );
};

export default ShowLikes;
