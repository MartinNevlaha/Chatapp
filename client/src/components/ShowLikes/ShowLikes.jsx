import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./ShowLikes.module.scss";
import User from "../User/User";
import { likeStatus } from "../../constants/likeStatus";

const ShowLikes = ({ showLike, close }) => {
  const { t } = useTranslation();
  ShowLikes.propTypes = {
    showLike: PropTypes.exact({
      likeType: PropTypes.number,
      users: PropTypes.array,
    }),
  };
  return (
    <div className={classes.likes}>
      <h2>
        {t("showLikes.people")} {showLike.likeType === likeStatus.like ? t("like.like") : t("like.dislike")}{" "}
        {t("showLikes.this")}
      </h2>
      <hr />
      <div className={classes.users}>
        {showLike.users.length > 0 ? (
          showLike.users.map((user) => (
            <User user={user} key={user.id} close={close} />
          ))
        ) : (
          <p>{t("showLikes.noLikes")}</p>
        )}
      </div>
    </div>
  );
};

export default ShowLikes;
