import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserUpdateForm from "../components/UserUpdate/UserUpdateForm";
import DeleteAccount from "../components/deleteAccount/deleteAccount";
import * as action from "../store/actions";
import Spinner from "../components/UI/Spinner/Spinner";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";

const UserUpdate = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userProfile.loading);

  const handleUpdateprofile = (data) => {
    dispatch(action.updateUserProfile(data));
  };

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  const handleModalOpen = () => {
    setIsModalShow(true);
  };

  const handleAccountDelete = () => {
    dispatch(action.deleteAccount());
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
      <Modal show={isModalShow}>
        <p>Do you realy want to delete your accont ?</p>
        <div>
          <Button danger clicked={handleModalClose}>
            Cancel
          </Button>
          <Button clicked={handleAccountDelete}>Ok</Button>
        </div>
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <UserUpdateForm updateProfile={handleUpdateprofile} />
          <DeleteAccount openModal={handleModalOpen} />
        </React.Fragment>
      )}
    </div>
  );
};

export default UserUpdate;
