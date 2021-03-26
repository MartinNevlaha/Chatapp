import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { parseDateTime } from "../../../utils/utilities";

import classes from "./Post.module.scss";
import Card from "../../UI/Card/Card";

export const Post = (props) => {
  return (
    <div className={classes.post}>
      <Card type="medium_card">
        <div className={classes.post_content}>
          <div className={classes.post_content_header}>
            <p>Created: {parseDateTime(props.created)}</p>
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="1x"
              cursor="pointer"
              className={classes.post_icon}
            />
          </div>
          <hr />
          <p>
            {props.text}
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
