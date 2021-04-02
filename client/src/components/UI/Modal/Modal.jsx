import React, { useRef, useEffect } from "react";

import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";


export const Modal = ({
  show,
  cancel,
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
            </div>
          )}
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default Modal;
