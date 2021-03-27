import React from "react";
import { useSelector } from "react-redux";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import Spinner from "../UI/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export const Posts = ({ createPost, posts, loadAnothnerPosts }) => {
  const loadingCreatePost = useSelector((state) => state.posts.loading);
  const numberOfPosts = useSelector((state) => state.posts.posts.length);
  return (
    <div className={classes.posts}>
      <NewPost createPost={createPost} />
      <hr />
      <div className={classes.posts_all}>
        <InfiniteScroll
          dataLength={numberOfPosts}
          next={loadAnothnerPosts}
          hasMore={true}
          loader={Spinner}
        >
          {loadingCreatePost && <Spinner />}
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Posts;
