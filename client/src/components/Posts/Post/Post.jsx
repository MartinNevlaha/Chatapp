import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { parseDateTime } from "../../../utils/utilities";
import classes from "./Post.module.scss";
import Card from "../../UI/Card/Card";
import LazyImage from "../../UI/LazyImage/LazyImage";
import EditPost from "./EditPost/EditPost";
import EditMode from "./EditMode/EditMode";
import Likes from "./Likes/Likes";
import Modal from "../../UI/Modal/Modal";

const Post = ({
  post,
  liker,
  userId,
  deletePost,
  setEditMode,
  deleteImage,
  updatePost,
  showLikes,
  placeOfUsage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleRedirectToUserInfo = (userId) => {
    history.push(`/user-info/${userId}`);
  };

  Post.propTypes = {
    post: PropTypes.object,
    liker: PropTypes.func,
    userId: PropTypes.number,
    deletePost: PropTypes.func,
    setEditMode: PropTypes.func,
    deleteImage: PropTypes.func,
    updatePost: PropTypes.func,
    showLikes: PropTypes.func,
    placeOfUsage: PropTypes.oneOf(["userPageInfo", "dashboard"]),
  };

  return (
    <div className={classes.post}>
      <Card type="medium_card">
        <div className={classes.post_content}>
          <div className={classes.post_content_header}>
            <p>{t("post.created")} {parseDateTime(post.createdAt)}</p>
            {placeOfUsage === "dashboard" && userId === post.User.id && (
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
                {placeOfUsage === "dashboard" && (
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
                          {t("post.userDetail")}
                        </ReactTooltip>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div
                          className={
                            classes.post_content_container_avatar_wrapper
                          }
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            size="2x"
                            data-tip
                            data-for="userFullName"
                            cursor="pointer"
                          />
                        </div>
                        <p>{post.User.fullName}</p>
                        <ReactTooltip
                          id="userFullName"
                          place="top"
                          effect="solid"
                          border={true}
                        >
                          {t("post.userDetail")}
                        </ReactTooltip>
                      </React.Fragment>
                    )}
                  </div>
                )}
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
              <Likes
                showLikes={showLikes}
                userId={userId}
                post={post}
                liker={liker}
              />
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
