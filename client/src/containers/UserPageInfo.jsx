import React from "react";
import { useParams } from "react-router-dom";

const UserPageInfo = () => {
  const { userId } = useParams();
  console.log(userId);
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
