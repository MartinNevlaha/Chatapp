import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./UserUpdateForm.module.scss";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import TextField from "../Inputs/TextField/TextField";

const UserUpdate = ({ updateProfile }) => {
  const [pwdReset, setPwdReset] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const user = useSelector((state) => state.userProfile.user);

  const SupportedFormat = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    oldPassword: Yup.string().min(6, "Password muste be at least 6 characters"),
    newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Password must match"
    ),
    avatar: Yup.mixed()
      .test("fileFormat", "Unsuported file format", (value) => {
        if (!value) {
          return true;
        } else {
          return value && SupportedFormat.includes(value.type);
        }
      })
      .notRequired(),
  });

  const handleResetPwd = (e) => {
    e.preventDefault();
    setPwdReset(!pwdReset);
  };

  let avatarContent = <FontAwesomeIcon icon={faUserCircle} size="10x" />;
  if (imagePreview) {
    avatarContent = (
      <div>
        <img src={imagePreview} alt="image-preview" />
      </div>
    );
  } else if (user.avatar) {
    avatarContent = <img src={user.avatar} alt="avatar" />;
  } else if (user.avatar && imagePreview) {
    avatarContent = (
      <div>
        <img src={imagePreview} alt="image-preview" />
      </div>
    );
  }

  UserUpdate.propTypes = {
    updateProfile: PropTypes.func,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        email: user.email ? user.email : "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        avatar: "",
      }}
      validationSchema={validate}
      onSubmit={(userData) => {
        let data = new FormData();
        for (const [key, value] of Object.entries(userData)) {
          data.append(key, value);
        }

        updateProfile(data);
      }}
    >
      {(formProps) => (
        <div className={classes.profile_container}>
          <h1>Here you can update your profile !</h1>
          <Form>
            <div className={classes.profile_container_inputs}>
              <Card type="small_card">
                <h2>{user.fullName}</h2>
                <div className={classes.profile_container_inputs_avatar}>
                  {avatarContent}
                  <label htmlFor="avatar">
                    <FontAwesomeIcon
                      icon={faImage}
                      size="3x"
                      cursor="pointer"
                      className={classes.upload}
                    />
                  </label>
                  <input
                    className={
                      classes.profile_container_inputs_avatar_file_input
                    }
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={(e) => {
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                      formProps.setFieldValue("avatar", e.target.files[0]);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                      padding: ".5rem",
                    }}
                    name="avatar"
                  />
                </div>
              </Card>
              <Card type="small_card">
                <div className={classes.profile_container_inputs_text}>
                  <TextField label="First Name" name="firstName" type="text" />
                  <TextField label="Last Name" name="lastName" type="text" />
                  <TextField label="Email" name="email" type="email" />
                  <h2>To reset password push Reset button</h2>
                  <Button clicked={handleResetPwd}>
                    {pwdReset ? "Close" : "Reset"}
                  </Button>
                  {pwdReset && (
                    <React.Fragment>
                      <TextField
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                      />
                      <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                      />
                      <TextField
                        label="Confirm New password"
                        name="confirmNewPassword"
                        type="password"
                      />
                    </React.Fragment>
                  )}
                </div>
              </Card>
            </div>
            <Button type="submit">Update</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default UserUpdate;
