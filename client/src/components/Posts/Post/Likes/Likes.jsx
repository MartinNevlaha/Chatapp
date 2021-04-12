import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { getLikeNumber, isLiked } from "../../../../utils/utilities";
import { likeStatus } from "../../../../constants/likeStatus";

const Likes = ({liker}) => {
  return (
    <div className={classes.post_content_footer}>
      <div className={classes.post_content_footer_likes}>
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
        <p>
          {getLikeNumber(post.Likes, likeStatus.like)}{" "}
          <span onClick={() => showLikes(post.id, likeStatus.like)}>likes</span>
        </p>
      </div>
      <div className={classes.post_content_footer_likes}>
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
        <p>
          {getLikeNumber(post.Likes, likeStatus.dislike)}{" "}
          <span onClick={() => showLikes(post.id, likeStatus.dislike)}>
            dislikes
          </span>
        </p>
      </div>
    </div>
  );
};

export default Likes;
