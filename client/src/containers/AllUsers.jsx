import React from "react";

import AllUsersList from "../components/AllUsersList/AllUsersList";

const AllUsers = () => {
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
      <AllUsersList />
    </div>
  );
};

export default AllUsers;
