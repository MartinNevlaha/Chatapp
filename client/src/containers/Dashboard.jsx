import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions/";
import UserSideBar from "../components/UserInfoSidebar/UserInfoSidebar";
import Posts from "../components/Posts/Posts";

const Dasboard = () => {
  const LIMIT = 15;
  const [page, setPage] = useState(0);
  const friendsPost = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchFriendRequest());
    dispatch(action.fetchFriendsPost(page, LIMIT));
  }, [dispatch]);

  const handleCreatePost = (data) => {
    dispatch(action.createPost(data));
  };

  const handlerLoadAnothnerPosts = () => {
    setPage(page + 1);
    dispatch(action.fetchFriendsPost(page + 1, LIMIT));
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
      <UserSideBar />
      <Posts
        createPost={handleCreatePost}
        posts={friendsPost}
        loadAnothnerPosts={handlerLoadAnothnerPosts}
      />
    </div>
  );
};

export default Dasboard;
