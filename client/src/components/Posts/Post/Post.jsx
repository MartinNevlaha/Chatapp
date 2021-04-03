import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

import { parseDateTime } from "../../../utils/utilities";
import classes from "./Post.module.scss";
import Card from "../../UI/Card/Card";
import LazyImage from "../../UI/LazyImage/LazyImage";
import EditPost from "./EditPost/EditPost";
import EditMode from "./EditMode/EditMode";
import { getLikeNumber, isLiked } from "../../../utils/utilities";

const Post = ({
  post,
  liker,
  userId,
  deletePost,
  setEditMode,
  deleteImage,
  updatePost,
  showLikes,
}) => {
  const history = useHistory();

  const handleRedirectToUserInfo = (userId) => {
    history.push(`/user-info/${userId}`);
  };

  return (
    <div className={classes.post}>
      <Card type="medium_card">
        <div className={classes.post_content}>
          <div className={classes.post_content_header}>
            <p>Created: {parseDateTime(post.createdAt)}</p>
            {userId === post.User.id && (
              <EditPost
                deletePost={deletePost}
                postId={post.id}
                setEditMode={setEditMode}
              />
            )}
          </div>
          <hr />
          {!post.editMode ? (
            <React.Fragment>
              <div className={classes.post_content_container}>
                <div
                  onClick={() => handleRedirectToUserInfo(post.User.id)}
                  className={classes.post_content_container_avatar}
                >
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
                      <LazyImage
                        image={{ src: post.image, alt: "postImage" }}
                      />
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
                    className={
                      isLiked(post.Likes, userId, 1)
                        ? [classes.post_icon, classes.is_liked].join(" ")
                        : classes.post_icon
                    }
                    onClick={() => liker("like", post.User.id, post.id)}
                  />
                  <p>
                    {getLikeNumber(post.Likes, "like")}{" "}
                    <span onClick={() => showLikes(post.id, 1)}>likes</span>
                  </p>
                </div>
                <div className={classes.post_content_footer_likes}>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    size="1x"
                    cursor="pointer"
                    className={
                      isLiked(post.Likes, userId, 0)
                        ? [classes.post_icon, classes.is_liked].join(" ")
                        : classes.post_icon
                    }
                    onClick={() => liker("dislike", post.User.id, post.id)}
                  />
                  <p>
                    {getLikeNumber(post.Likes, "unlike")}{" "}
                    <span onClick={() => showLikes(post.id, 0)}>dislikes</span>
                  </p>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <EditMode
              post={post}
              deleteImage={deleteImage}
              updatePost={updatePost}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Post;
