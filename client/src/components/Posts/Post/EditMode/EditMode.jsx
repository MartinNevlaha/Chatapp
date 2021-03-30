import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import classes from "./EditMode.module.scss";
import AreaField from "../../../Inputs/AreaField/AreaField";

export const EditMode = ({ post }) => {
  const [fileName, setFileName] = useState("");

  const suportedImageFormat = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  return <Formik
    enableReinitialize={true}
    initialValues={{
      textContent: post.text ? post.text : "",
      image: post.image ? post.image : null
    }}
  >
    {formProps => {
      <div className={classes.edit_mode}>
        <Form>
          <h2>Edit Mode</h2>
          <AreaField label="Post content" name="textContent" />
        </Form>
      </div>
    }}
  </Formik>
};

export default EditMode;
