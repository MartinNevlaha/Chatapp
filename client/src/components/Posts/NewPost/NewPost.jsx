import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./NewPost.module.scss";
import Card from "../../UI/Card/Card";
import AreaField from "../../Inputs/AreaField/AreaField";

export const NewPost = ({ createPost }) => {
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

  NewPost.propTypes = {
    createPost: PropTypes.func
  }

  return (
    <Formik
      initialValues={{
        textContent: "",
        image: "",
      }}
      validationSchema={validate}
      onSubmit={(postData, { resetForm }) => {
        let data = new FormData();
        for (const [key, value] of Object.entries(postData)) {
          data.append(key, value);
        }
        createPost(data);
        resetForm();
        setFileName("");
      }}
    >
      {(formProps) => (
        <div className={classes.post_new}>
          <Card type="medium_card">
            <Form>
              <h2>Create new post</h2>
              <AreaField label="Post content" name="textContent" />
              <div className={classes.post_new_bottom}>
                <div className={classes.post_new_bottom_input}>
                  <label htmlFor="image">
                    <FontAwesomeIcon
                      icon={faImage}
                      className={classes.post_new_icon}
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

                <button type="submit">CREATE</button>
              </div>
              <ErrorMessage
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  padding: ".5rem",
                }}
                name="image"
              />
            </Form>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export default NewPost;
