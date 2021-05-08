import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./Likes.module.scss";
import { getLikeNumber, isLiked } from "../../../../utils/utilities";
import { likeStatus } from "../../../../constants/likeStatus";

const Likes = ({ liker, showLikes, userId, post }) => {
  const { t } = useTranslation();

  Likes.propTypes = {
    liker: PropTypes.func,
    showLikes: PropTypes.func,
    userId: PropTypes.number,
    post: PropTypes.object,
  };
  return (
    <div className={classes.post_content_footer}>
      <div className={classes.post_content_footer_likes}>
        {userId !== post.userId ? (
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="1x"
            cursor="pointer"
            className={
              isLiked(post.Likes, userId, likeStatus.like)
                ? [classes.post_icon, classes.is_liked].join(" ")
                : classes.post_icon
            }
            onClick={() => liker(likeStatus.like, post.userId, post.id)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="1x"
            style={{ margin: "1rem" }}
          />
        )}
        <p>
          {getLikeNumber(post.Likes, likeStatus.like)}{" "}
          <span onClick={() => showLikes(post.id, likeStatus.like)}>{t("like.like")}</span>
        </p>
      </div>
      <div className={classes.post_content_footer_likes}>
        {userId !== post.userId ? (
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="1x"
            cursor="pointer"
            className={
              isLiked(post.Likes, userId, likeStatus.dislike)
                ? [classes.post_icon, classes.is_liked].join(" ")
                : classes.post_icon
            }
            onClick={() => liker(likeStatus.dislike, post.userId, post.id)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="1x"
            style={{ margin: "1rem" }}
          />
        )}

        <p>
          {getLikeNumber(post.Likes, likeStatus.dislike)}{" "}
          <span onClick={() => showLikes(post.id, likeStatus.dislike)}>
            {t("like.dislike")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Likes;
