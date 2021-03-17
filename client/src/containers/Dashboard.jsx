import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions/";
import useSocket from "../hooks/socketConnect";
import AllUsers from "../components/AllUsers/AllUsers";

const Dasboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userAuth.user.userId);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchActiveUsers());
    dispatch(action.fetchFriendRequest());
  }, [dispatch]);

  useSocket(userId, dispatch);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <AllUsers users={users} />
    </div>
  );
};

export default Dasboard;
