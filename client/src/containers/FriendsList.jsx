import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "../hooks/socketConnect";
import AllFriends from "../components/AllFriends/AllFriends";
import * as action from "../store/actions";

const FriendsList = () => {
  const dispatch = useDispatch();
  const friendships = useSelector((state) => state.friendships.friendships);
  const loading = useSelector((state) => state.friendships.loading);
  const userId = useSelector(state => state.userProfile.user.id);

  useEffect(() => {
    dispatch(action.fetchFriends());
  }, [dispatch]);


  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "wrap",
    }}>
      <AllFriends friendships={friendships} loading={loading} />
    </div>
  );
};

export default FriendsList;
