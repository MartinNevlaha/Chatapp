import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as action from "../store/actions";

const UserPageInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(action.getUserInfo(+userId))
  }, [userId, dispatch]);

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
      ...DetailuserInfo
    </div>
  );
};

export default UserPageInfo;
