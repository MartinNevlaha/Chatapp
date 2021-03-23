import React from "react";

import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

export const Modal = ({ show, closeModal, loading, children, clicked }) => {
  return (
    <React.Fragment>
      <Backdrop show={show} clicked={closeModal}>
        <div className={classes.modal}>
          {loading ? (
            <Spinner />
          ) : (
            <div className={classes.modal_content}>
              {children}
              <div className={classes.modal_content_btn_container}>
                <Button danger clicked={clicked}>
                  Cancel
                </Button>
                <Button clicked={clicked}>Ok</Button>
              </div>
            </div>
          )}
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default Modal;
