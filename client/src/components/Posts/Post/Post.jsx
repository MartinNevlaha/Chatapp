import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faThumbsUp,
  faThumbsDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import { parseDateTime } from "../../../utils/utilities";
import classes from "./Post.module.scss";
import Card from "../../UI/Card/Card";

export const Post = ({ post }) => {
  return (
    <div className={classes.post}>
      <Card type="medium_card">
        <div className={classes.post_content}>
          <div className={classes.post_content_header}>
            <p>Created: {parseDateTime(post.createdAt)}</p>
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="1x"
              cursor="pointer"
              className={classes.post_icon}
            />
          </div>
          <hr />
          <div className={classes.post_content_container}>
            <div className={classes.post_content_container_avatar}>
              {post.User.avatar ? (
                <React.Fragment>
                  <img
                    src={post.User.avatar}
                    alt="avatar"
                    data-tip
                    data-for="userFullName"
                  />
                  <p>{post.User.fullName}</p>
                  <ReactTooltip
                    id="userFullName"
                    place="top"
                    effect="solid"
                    border={true}
                  >
                    Click for user detail
                  </ReactTooltip>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                    data-tip
                    data-for="userFullName"
                    cursor="pointer"
                  />
                  <p>{post.User.fullName}</p>
                  <ReactTooltip
                    id="userFullName"
                    place="top"
                    effect="solid"
                    border={true}
                  >
                    Click for user detail
                  </ReactTooltip>
                </React.Fragment>
              )}
            </div>
            <div className={classes.post_content_container_main}>
              {post.image && (
                <div className={classes.post_content_container_main_image}>
                  <img src={post.image} alt="postImage" />
                </div>
              )}
              <p>{post.text}</p>
            </div>
          </div>

          <div className={classes.post_content_footer}>
            <div className={classes.post_content_footer_likes}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                size="1x"
                cursor="pointer"
                className={classes.post_icon}
              />
              <p>{post.like}</p>
            </div>
            <div className={classes.post_content_footer_likes}>
              <FontAwesomeIcon
                icon={faThumbsDown}
                size="1x"
                cursor="pointer"
                className={classes.post_icon}
              />
              <p>{post.unlike}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
