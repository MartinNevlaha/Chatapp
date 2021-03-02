import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch } from "react-redux";

import UserUpdateForm from "../components/UserUpdate/UserUpdateForm";
import * as action from "../store/actions";

const UserUpdate = () => {
  const dispatch = useDispatch();

  const handleUpdateprofile = (data) => {
    console.log(data);
    dispatch(action.updateUserProfile(data));
  };

  return (
    <div>
      <UserUpdateForm updateProfile={handleUpdateprofile} />
    </div>
  );
};

export default UserUpdate;
