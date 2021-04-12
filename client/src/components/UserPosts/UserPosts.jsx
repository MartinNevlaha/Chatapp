import React from "react";
import PropTypes from "prop-types";

import classes from "./UserPosts.module.scss";
import Post from "../Posts/Post/Post";
import { friendStatus } from "../../config/friendStatus";

const UserPosts = ({ isFriend, posts, placeOfUsage, liker }) => {
  const handleShowLikes = () => {};

  UserPosts.propTypes = {
    isFriend: PropTypes.oneOf([0, 1, 2, 3]),
    posts: PropTypes.array,
    placeOfUsage: PropTypes.string,
    liker: PropTypes.func,
  };

  return (
    <div className={classes.userPosts}>
      <h2>User posts</h2>
      <hr />
      {isFriend === friendStatus.accept ? (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            liker={liker}
            showLikes={handleShowLikes}
            placeOfUsage={placeOfUsage}
          />
        ))
      ) : (
        <div className={classes.userPosts_blur}>
          <div className={classes.userPosts_blur_background}></div>
          <div className={classes.userPosts_blur_text}>
            <p>You have to be friends to see posts</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
