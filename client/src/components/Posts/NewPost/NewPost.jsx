import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

import classes from "./NewPost.module.scss";
import Card from "../../UI/Card/Card";

export const NewPost = () => {
  const suportedImageFormat = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const suportedVideoFormat = ["video/avi", "video/mpg", "video/mp4"];

  const validate = Yup.object({
    textContent: Yup.string()
      .max(255, "Your post must be 255 characters or less")
      .notRequired(),
    image: Yup.mixed()
      .test("fileFormat", "Unsuported image file format", (value) => {
        if (!value) {
          return true;
        } else {
          return value && suportedImageFormat.includes(value.type);
        }
      })
      .notRequired(),
    video: Yup.mixed()
      .test("fileFormat", "Unsuported video file format", (value) => {
        if (!value) {
          return true;
        } else {
          return value && suportedVideoFormat.includes(value.type);
        }
      })
      .notRequired(),
  });

  return (
    <Formik
      initialValues={{
        textContent: "",
        image: "",
        video: "",
      }}
      validationSchema={validate}
      onSubmit={(postData) => {
        console.log(postData);
      }}
    >
      {(fromProps) => (
        <div className={classes.post_new}>
          <Card type="medium_card">
            <Form>
              <h2>Create new post</h2>
              <textarea
                name="textArea"
                cols="30"
                rows="10"
                maxLength="256"
                name="textContent"
              ></textarea>
              <div className={classes.post_new_bottom}>
                <FontAwesomeIcon
                  icon={faImage}
                  className={classes.post_new_icon}
                />
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    fromProps.setFieldValue("image", e.target.files[0])
                  }
                />
                <FontAwesomeIcon
                  icon={faVideo}
                  className={classes.post_new_icon}
                />
                <input
                  type="file"
                  name="video"
                  onChange={(e) => fromProps.setFieldValue("video", e.target.files[0])}
                />
                <button type="submit">CREATE</button>
              </div>
              <ErrorMessage
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  padding: ".5rem",
                }}
                name="textContent"
              />
              <ErrorMessage
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  padding: ".5rem",
                }}
                name="image"
              />
              <ErrorMessage
                component="div"
                style={{
                  color: "red",
                  fontSize: ".8rem",
                  padding: ".5rem",
                }}
                name="video"
              />
            </Form>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export default NewPost;
