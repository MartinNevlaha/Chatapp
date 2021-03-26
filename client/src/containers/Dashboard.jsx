import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions/";
import UserSideBar from "../components/UserInfoSidebar/UserInfoSidebar";
import Posts from "../components/Posts/Posts";

const Dasboard = () => {
  const friendsPost = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchFriendRequest());
    dispatch(action.fetchFriendsPost(0, 10));
  }, [dispatch]);

  const handleCreatePost = (data) => {
    dispatch(action.createPost(data));
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
      <Posts createPost={handleCreatePost} posts={friendsPost} />
    </div>
  );
};

export default Dasboard;
