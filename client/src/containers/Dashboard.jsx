import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as action from "../store/actions/";



const Dasboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchUserProfile());
    dispatch(action.fetchActiveUsers());
    dispatch(action.fetchFriendRequest());
  }, [dispatch]);


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
      ...Dashboard
    </div>
  );
};

export default Dasboard;
