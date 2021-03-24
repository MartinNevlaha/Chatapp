import React, { useRef, useEffect } from "react";

import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

export const Modal = ({
  show,
  cancel,
  submit,
  loading,
  children,
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
      cancel();
    }
  }

  return (
    <React.Fragment>
      <Backdrop show={show} clicked={cancel}>
        <div className={classes.modal} ref={modalRef}>
          {loading ? (
            <Spinner />
          ) : (
            <div className={classes.modal_content} >
              {children}
              <div className={classes.modal_content_btn_container}>
                <Button danger clicked={cancel}>
                  Cancel
                </Button>
                <Button clicked={submit}>Ok</Button>
              </div>
            </div>
          )}
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default Modal;
