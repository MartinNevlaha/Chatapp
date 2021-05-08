import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./EditMode.module.scss";
import AreaField from "../../../Inputs/AreaField/AreaField";
import Button from "../../../UI/Button/Button";

const EditMode = ({ post, deleteImage, updatePost }) => {
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { t } = useTranslation();

  const suportedImageFormat = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const validate = Yup.object({
    textContent: Yup.string()
      .max(255, t("validation.errMax"))
      .required(t("validation.errContent")),
    image: Yup.mixed()
      .test("fileFormat", t("validation.errFileFormat"), (value) => {
        if (!value) {
          return true;
        } else {
          return value && suportedImageFormat.includes(value.type);
        }
      })
      .notRequired(),
  });

  EditMode.propTypes = {
    post: PropTypes.object,
    deleteImage: PropTypes.func,
    updatePost: PropTypes.func,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        textContent: post.text ? post.text : "",
        image: "",
      }}
      validationSchema={validate}
      onSubmit={(postData, { resetForm }) => {
        let data = new FormData();
        for (const [key, value] of Object.entries(postData)) {
          data.append(key, value);
        }
        resetForm();
        updatePost(post.id, data);
      }}
    >
      {(formProps, values) => (
        <div className={classes.edit_mode}>
          <h2>{t("editMode.editMode")}</h2>
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
                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="image-preview" />
                    <ErrorMessage
                      component="div"
                      style={{
                        color: "red",
                        fontSize: ".8rem",
                        padding: ".5rem",
                      }}
                      name="image"
                    />
                  </div>
                )}
                <h3>{t("editMode.upload")}</h3>
                <label htmlFor="postImage">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="3x"
                    className={classes.edit_mode_image_upload_icon}
                  />
                  <p>{fileName}</p>
                  <input
                    onChange={(e) => {
                      const [file] = e.target.files;
                      const { name } = file;
                      setFileName(name);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                      formProps.setFieldValue("image", e.target.files[0]);
                    }}
                    accept=".png, .jpg, .jpeg, .gif"
                    type="file"
                    id="postImage"
                    name="image"
                  />
                </label>
              </div>
            )}
            <AreaField label="Post content" name="textContent" />
            <Button type="submit">{t("editMode.update")}</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default EditMode;
