import React, { useRef, useEffect } from "react";

import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

export const Modal = ({
  show,
  closeModal,
  loading,
  children,
  deleteAccount,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose)
    }
  }, [modalRef])

  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  }

  return (
    <React.Fragment>
      <Backdrop show={show} clicked={closeModal}>
        <div className={classes.modal} ref={modalRef}>
          {loading ? (
            <Spinner />
          ) : (
            <div className={classes.modal_content} >
              {children}
              <div className={classes.modal_content_btn_container}>
                <Button danger clicked={closeModal}>
                  Cancel
                </Button>
                <Button clicked={deleteAccount}>Ok</Button>
              </div>
            </div>
          )}
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default Modal;
