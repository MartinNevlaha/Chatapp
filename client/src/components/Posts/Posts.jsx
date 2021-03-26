import React from "react";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";

export const Posts = ({ createPost }) => {
  return (
    <div className={classes.posts}>
      <NewPost createPost={createPost} />
      <hr />
      <div className={classes.posts_all}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Posts;
