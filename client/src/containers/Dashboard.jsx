import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions/";
import UserSideBar from "../components/UserInfoSidebar/UserInfoSidebar";
import Posts from "../components/Posts/Posts";
import { likeStatus } from "../config/likeStatus";

const Dasboard = () => {
  const LIMIT = 15;
  const [page, setPage] = useState(0);
  const friendsPost = useSelector((state) => state.posts.posts || []);
  const userProfile = useSelector((state) => state.userProfile.user);
  const userId = useSelector((state) => state.userAuth.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchFriendRequest());
    dispatch(action.fetchFriendsPost(page, LIMIT));

    return () => {
      dispatch(action.clearPosts());
    };
  }, [dispatch]);

  const handleCreatePost = (data) => {
    dispatch(action.createPost(data));
  };

  const handlerLoadAnothnerPosts = () => {
    setPage(page + 1);
    dispatch(action.fetchFriendsPost(page + 1, LIMIT));
  };

  const handleLiker = (status, friendId, postId) => {
    const data = {
      friendId,
      likeOrUnlike: status === likeStatus.like ? likeStatus.like : likeStatus.dislike,
    };
    dispatch(action.likePost(postId, data));
  };

  const handleDeletePost = (postId) => {
    dispatch(action.deletePost(postId));
  };

  const handleEditMode = (postId) => {
    dispatch(action.setEditMode(postId));
  };

  const handleDeletePostImage = (postId) => {
    dispatch(action.deletePostImage(postId));
  };

  const handleUpdatePost = (postId, data) => {
    dispatch(action.updatePost(postId, data));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <UserSideBar userProfile={userProfile} showMyself={true} />
      <Posts
        userId={userId}
        createPost={handleCreatePost}
        posts={friendsPost}
        loadAnothnerPosts={handlerLoadAnothnerPosts}
        liker={handleLiker}
        deletePost={handleDeletePost}
        setEditMode={handleEditMode}
        deleteImage={handleDeletePostImage}
        updatePost={handleUpdatePost}
        placeOfUsage="dashboard"
      />
    </div>
  );
};

export default Dasboard;
