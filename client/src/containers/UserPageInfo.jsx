import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as action from "../store/actions";
import UserInfoSidebar from "../components/UserInfoSidebar/UserInfoSidebar";
import FriedList from "../components/FriendList/FriendList";

const UserPageInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const isFriend = useSelector((state) => state.userInfo.isFriend);
  const loading = useSelector((state) => state.userInfo.loading);
  const loadingUserFriends = useSelector(
    (state) => state.userInfo.loadingUserFriends
  );
  const userFriendList = useSelector((state) => state.userInfo.userFriends);

  useEffect(() => {
    dispatch(action.getUserInfo(+userId));
    dispatch(action.getUserFriends(+userId));

    return () => {
      console.log("clean up on unmount");
    };
  }, [dispatch, userId]);

  const handleAddFriend = () => {
    const data = {
      friendId: +userId,
    };
    dispatch(action.addFriend(data, "onInfoPage"));
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
      <div>
        <UserInfoSidebar
          isFriend={isFriend}
          userProfile={userInfo}
          addFriend={handleAddFriend}
        />
        <FriedList loading={loadingUserFriends} friendList={userFriendList} />
      </div>
    </div>
  );
};

export default UserPageInfo;
