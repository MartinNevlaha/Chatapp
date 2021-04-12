import React from "react";
import PropTypes from "prop-types";

import classes from "./ShowLikes.module.scss";
import User from "../User/User";
import { likeStatus } from "../../config/likeStatus";

const ShowLikes = ({ showLike, close }) => {
  ShowLikes.propTypes = {
    showLike: PropTypes.exact({
      likeType: PropTypes.number,
      users: PropTypes.array
    })
  }
  return (
    <div className={classes.likes}>
      <h2>
        People who {showLike.likeType === likeStatus.like ? "like" : "dislike"}{" "}
        this post
      </h2>
      <hr />
      <div className={classes.users}>
        {showLike.users.length > 0 ? (
          showLike.users.map((user) => (
            <User user={user} key={user.id} close={close} />
          ))
        ) : (
          <p>No like or dislike</p>
        )}
      </div>
    </div>
  );
};

export default ShowLikes;
