import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Post.module.scss";
import Card from "../../UI/Card/Card";

export const Post = () => {
  return (
    <div className={classes.post}>
      <Card type="medium_card">
        <div className={classes.post_content}>
          <div className={classes.post_content_header}>
            <p>Created: 30.6.2020</p>
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="1x"
              cursor="pointer"
              className={classes.post_icon}
            />
          </div>
          <hr/>
          <p>
            Post text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."{" "}
          </p>
          <div className={classes.post_content_footer}>
            <div className={classes.post_content_footer_likes}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                size="1x"
                cursor="pointer"
                className={classes.post_icon}
              />
              <p>{22}</p>
            </div>
            <div className={classes.post_content_footer_likes}>
              <FontAwesomeIcon
                icon={faThumbsDown}
                size="1x"
                cursor="pointer"
                className={classes.post_icon}
              />
              <p>{2}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
