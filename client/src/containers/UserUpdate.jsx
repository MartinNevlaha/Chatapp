import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserUpdateForm from "../components/UserUpdate/UserUpdateForm";
import DeleteAccount from "../components/deleteAccount/deleteAccount";
import * as action from "../store/actions";
import Spinner from "../components/UI/Spinner/Spinner";
import Modal from "../components/UI/Modal/Modal";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userProfile.loading);

  const handleUpdateprofile = (data) => {
    dispatch(action.updateUserProfile(data));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Modal show>
        Do you realy want to delete your accont ?
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <UserUpdateForm updateProfile={handleUpdateprofile} />
          <DeleteAccount />
        </React.Fragment>
      )}
    </div>
  );
};

export default UserUpdate;
