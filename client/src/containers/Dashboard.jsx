import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as action from "../store/actions/";
import UserSideBar from "../components/UserInfoSidebar/UserInfoSidebar";
import Posts from "../components/Posts/Posts";

const Dasboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchFriendRequest());
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
      <Posts createPost={handleCreatePost} />
    </div>
  );
};

export default Dasboard;
