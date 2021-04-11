import React from "react";
import PropTypes from "prop-types";

import classes from "./UserPosts.module.scss";
import Post from "../Posts/Post/Post";

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
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          liker={liker}
          showLikes={handleShowLikes}
          placeOfUsage={placeOfUsage}
        />
      ))}
    </div>
  );
};

export default UserPosts;
