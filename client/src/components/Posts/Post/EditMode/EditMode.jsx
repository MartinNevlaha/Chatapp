import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import classes from "./EditMode.module.scss";
import AreaField from "../../../Inputs/AreaField/AreaField";
import Button from "../../../UI/Button/Button";

export const EditMode = ({ post, deleteImage }) => {
  const [fileName, setFileName] = useState("");

  const suportedImageFormat = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const validate = Yup.object({
    textContent: Yup.string()
      .max(255, "Your post must be 255 characters or less")
      .required("Content is required"),
    image: Yup.mixed()
      .test("fileFormat", "Unsuported image file format", (value) => {
        if (!value) {
          return true;
        } else {
          return value && suportedImageFormat.includes(value.type);
        }
      })
      .notRequired(),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        textContent: post.text ? post.text : "",
        image: post.image ? post.image : null,
      }}
      validationSchema={validate}
      onSubmit={(postData, { resetForm }) => {
        console.log(postData);
      }}
    >
      {(formProps) => (
        <div className={classes.edit_mode}>
          <h2>Edit mode</h2>
          <Form>
            {post.image ? (
              <div className={classes.edit_mode_image}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="1x"
                  onClick={() => deleteImage(post.id)}
                  className={classes.edit_mode_image_delete}

                />
                <img src={post.image} alt={post.image} />
              </div>
            ) : (
              <div className={classes.edit_mode_image_upload}>
                <h3>Upload image</h3>
                <label htmlFor="image">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="5x"
                    className={classes.edit_mode_image_upload_icon}
                  />
                  <p>{fileName}</p>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    const [file] = e.target.files;
                    const { name } = file;
                    setFileName(name);
                    formProps.setFieldValue("image", e.target.files[0]);
                  }}
                />
              </div>
            )}
            <AreaField label="Post content" name="textContent" />
            <Button type="submit">Update post</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default EditMode;
