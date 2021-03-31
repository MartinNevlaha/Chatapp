import React from "react";
import { useSelector } from "react-redux";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import Spinner from "../UI/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export const Posts = ({
  createPost,
  posts,
  loadAnothnerPosts,
  liker,
  userId,
  deletePost,
  setEditMode,
  deleteImage
}) => {
  const loadingCreatePost = useSelector(
    (state) => state.posts.loadingCreatePost
  );
  const loading = useSelector((state) => state.posts.loading);
  return (
    <div className={classes.posts}>
      <NewPost createPost={createPost} />
      <hr />
      <div className={classes.posts_all}>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadAnothnerPosts}
          hasMore={true}
        >
          {loadingCreatePost && <Spinner />}
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              deletePost={deletePost}
              liker={liker}
              userId={userId}
              setEditMode={setEditMode}
              deleteImage={deleteImage}
            />
          ))}
          {loading && <Spinner />}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Posts;
