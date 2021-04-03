import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import Spinner from "../UI/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../UI/Modal/Modal";
import ShowLikes from "../ShowLikes/ShowLikes";

export const Posts = ({
  createPost,
  posts,
  loadAnothnerPosts,
  liker,
  userId,
  deletePost,
  setEditMode,
  deleteImage,
  updatePost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLike, setShowLike] = useState({
    likeType: null,
    users: null,
  });
  const loadingCreatePost = useSelector(
    (state) => state.posts.loadingCreatePost
  );
  const loading = useSelector((state) => state.posts.loading);

  const handleShowLikes = (postId, likeType) => {
    setIsModalOpen(true);
    const post = posts.filter((post) => post.id === postId)[0];
    setShowLike({
      ...showLike,
      likeType: likeType,
      users: showLikeHelper(post.Likes, likeType),
    });
  };

  const showLikeHelper = (likes, likeType) => {
    let updatedLikes = likes.map((like) => {
      console.log(like.status, likeType);
      if (like.status === likeType) {
        return { ...like.User };
      } 
    });
    if ( typeof updatedLikes[0] === "undefined") updatedLikes = [];
    return updatedLikes;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <React.Fragment>
      <Modal show={isModalOpen} cancel={handleModalClose}>
        <ShowLikes showLike={showLike}/>
      </Modal>
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
                updatePost={updatePost}
                showLikes={handleShowLikes}
              />
            ))}
            {loading && <Spinner />}
          </InfiniteScroll>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Posts;
