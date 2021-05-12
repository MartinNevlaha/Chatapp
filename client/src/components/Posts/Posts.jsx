import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Posts.module.scss";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import Spinner from "../UI/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../UI/Modal/Modal";
import ShowLikes from "../ShowLikes/ShowLikes";
import PropTypes from "prop-types";
import { showLikeHelper } from "../../utils/utilities";

const Posts = ({
  createPost,
  posts,
  loadAnothnerPosts,
  liker,
  userId,
  deletePost,
  setEditMode,
  deleteImage,
  updatePost,
  placeOfUsage,
  hasMorePosts,
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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  Posts.propTypes = {
    createPost: PropTypes.func,
    posts: PropTypes.array.isRequired,
    loadAnothnerPosts: PropTypes.func,
    liker: PropTypes.func,
    userId: PropTypes.number,
    deletePost: PropTypes.func,
    setEditMode: PropTypes.func,
    deleteImage: PropTypes.func,
    updatePost: PropTypes.func,
    placeOfUsage: PropTypes.oneOf(["userPageInfo", "dashboard"]),
    hasMorePosts: PropTypes.bool,
  };

  return (
    <React.Fragment>
      <Modal show={isModalOpen} cancel={handleModalClose}>
        <ShowLikes showLike={showLike} close={handleModalClose} />
      </Modal>
      <div className={classes.posts}>
        {placeOfUsage === "dashboard" && (
          <React.Fragment>
            <NewPost createPost={createPost} />
            <hr />
          </React.Fragment>
        )}
        <div className={classes.posts_all}>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadAnothnerPosts}
            hasMore={hasMorePosts}
          >
            {posts.length === 0 && <p>No posts</p>}
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
                placeOfUsage={placeOfUsage}
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
