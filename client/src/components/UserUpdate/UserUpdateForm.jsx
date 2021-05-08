import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./UserUpdateForm.module.scss";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import TextField from "../Inputs/TextField/TextField";

const UserUpdate = ({ updateProfile }) => {
  const [pwdReset, setPwdReset] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const user = useSelector((state) => state.userProfile.user);
  const { t } = useTranslation();

  const SupportedFormat = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, t("validation.errNameMax"))
      .required(t("validation.errContent")),
    lastName: Yup.string()
      .max(20, t("validation.errNameMax"))
      .required(t("validation.errContent")),
    email: Yup.string()
      .email(t("validation.errEmailValidity"))
      .required(t("validation.errEmailReq")),
    oldPassword: Yup.string().min(6, t("validation.errPassMin")),
    newPassword: Yup.string().min(6, t("validation.errPassMin")),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      t("validation.errConfirmPass")
    ),
    avatar: Yup.mixed()
      .test("fileFormat", t("validation.errFileFormat"), (value) => {
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
          <h1>{t("userProfile.title")}</h1>
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
                  <TextField
                    label={t("register.firstName")}
                    name="firstName"
                    type="text"
                  />
                  <TextField
                    label={t("register.lastName")}
                    name="lastName"
                    type="text"
                  />
                  <TextField label="Email" name="email" type="email" />
                  <h2>{t("userProfile.resetPass")}</h2>
                  <Button clicked={handleResetPwd}>
                    {pwdReset
                      ? t("userProfile.closeBtn")
                      : t("userProfile.resetBtn")}
                  </Button>
                  {pwdReset && (
                    <React.Fragment>
                      <TextField
                        label={t("userProfile.oldPass")}
                        name="oldPassword"
                        type="password"
                      />
                      <TextField
                        label={t("userProfile.newPass")}
                        name="newPassword"
                        type="password"
                      />
                      <TextField
                        label={t("userProfile.confirmNewPass")}
                        name="confirmNewPassword"
                        type="password"
                      />
                    </React.Fragment>
                  )}
                </div>
              </Card>
            </div>
            <Button type="submit">{t("userProfile.btn")}</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default UserUpdate;
