import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import classes from "./NewPost.module.scss";
import Card from "../../UI/Card/Card";
import AreaField from "../../Inputs/AreaField/AreaField";

export const NewPost = () => {
  const suportedImageFormat = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

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
  });

  return (
    <Formik
      initialValues={{
        textContent: "",
        image: "",
      }}
      validationSchema={validate}
      onSubmit={(postData) => {
        let data = new FormData();
        for (const [key, value] of Object.entries(postData)) {
          data.append(key, value);
        }
        // upload to BE
      }}
    >
      {(fromProps) => (
        <div className={classes.post_new}>
          <Card type="medium_card">
            <Form>
              <h2>Create new post</h2>
              <AreaField label="Post content" name="textContent" />
              <div className={classes.post_new_bottom}>
                <label htmlFor="image">
                  <FontAwesomeIcon
                    icon={faImage}
                    className={classes.post_new_icon}
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) =>
                    fromProps.setFieldValue("image", e.target.files[0])
                  }
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