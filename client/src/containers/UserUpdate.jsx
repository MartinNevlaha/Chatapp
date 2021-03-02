import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserUpdateForm from "../components/UserUpdate/UserUpdateForm";
import * as action from "../store/actions";
import Spinner from "../components/UI/Spinner/Spinner";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userProfile.loading);

  const handleUpdateprofile = (data) => {
    dispatch(action.updateUserProfile(data));
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-around",
      flexWrap: "wrap"
    }}>
      {loading ? (
        <Spinner />
      ) : (
        <UserUpdateForm updateProfile={handleUpdateprofile} />
      )}
    </div>
  );
};

export default UserUpdate;
