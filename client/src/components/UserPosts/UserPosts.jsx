import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./UserPosts.module.scss";
import Post from "../Posts/Post/Post";
import { friendStatus } from "../../constants/friendStatus";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import ShowLikes from "../ShowLikes/ShowLikes";
import { showLikeHelper } from "../../utils/utilities";
import InfiniteScroll from "react-infinite-scroll-component";

const UserPosts = ({
  isFriend,
  posts,
  placeOfUsage,
  liker,
  loading,
  loadAnotherPosts,
  hasMorePosts
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLike, setShowLike] = useState({
    likeType: null,
    users: null,
  });

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

  UserPosts.propTypes = {
    isFriend: PropTypes.oneOf([0, 1, 2, 3, 4]),
    posts: PropTypes.array,
    placeOfUsage: PropTypes.string,
    liker: PropTypes.func,
    loading: PropTypes.bool,
    loadAnotherPosts: PropTypes.func,
    hasMorePosts: PropTypes.bool
  };

  let content = <Spinner />;

  if (!loading) {
    content = posts.map((post) => (
      <Post
        key={post.id}
        post={post}
        liker={liker}
        showLikes={handleShowLikes}
        placeOfUsage={placeOfUsage}
      />
    ));
  }

  return (
    <React.Fragment>
      <Modal show={isModalOpen} cancel={handleModalClose}>
        <ShowLikes showLike={showLike} close={handleModalClose} />
      </Modal>
      <div className={classes.userPosts}>
        <h2>User posts</h2>
        {isFriend === friendStatus.accept ||
        isFriend === friendStatus.myself ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={loadAnotherPosts}
            hasMore={hasMorePosts}
          >
            {posts.length ? content : <p>User has no posts yet</p>}
          </InfiniteScroll>
        ) : (
          <div className={classes.userPosts_blur}>
            <div className={classes.userPosts_blur_background}></div>
            <div className={classes.userPosts_blur_text}>
              <p>You have to be friends to see posts</p>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserPosts;
