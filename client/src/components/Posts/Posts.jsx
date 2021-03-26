import React from "react";
import { useSelector } from "react-redux";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import Spinner from "../UI/Spinner/Spinner";

export const Posts = ({ createPost }) => {
  const loadingCreatePost = useSelector(state => state.posts.loading);
  return (
    <div className={classes.posts}>
      <NewPost
        createPost={createPost}
      />
      <hr />
      <div className={classes.posts_all}>
        {loadingCreatePost && <Spinner />}
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
