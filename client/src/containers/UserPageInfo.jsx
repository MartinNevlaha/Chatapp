import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as action from "../store/actions";
import UserInfoSidebar from "../components/UserInfoSidebar/UserInfoSidebar";

const UserPageInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const isFriend = useSelector((state) => state.userInfo.isFriend);
  const loading = useSelector((state) => state.userInfo.loading);

  useEffect(() => {
    dispatch(action.getUserInfo(+userId));

    return () => {
      console.log("clean up on unmount");
    }
  }, [dispatch]);

  const handleAddFriend = () => {
    const data = {
      friendId: +userId,
    };
    dispatch(action.addFriend(data, 'onInfoPage'));
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
      <UserInfoSidebar
        isFriend={isFriend}
        userProfile={userInfo}
        addFriend={handleAddFriend}
      />
    </div>
  );
};

export default UserPageInfo;
