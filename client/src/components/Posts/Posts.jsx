import React from "react";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";

export const Posts = () => {
  return (
    <div className={classes.posts}>
      <NewPost />
      <hr/>
      <div className={classes.posts_all}>
        <Post />
      </div>
    </div>
  );
};

export default Posts;
