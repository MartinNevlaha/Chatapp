import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

import classes from "./NewPost.module.scss";
import Card from "../../UI/Card/Card";

export const NewPost = () => {
  return (
    <div className={classes.post_new}>
      <Card type="medium_card">
        <h2>Create new post</h2>
        <textarea
          name="textArea"
          cols="30"
          rows="10"
          maxLength="255"
        ></textarea>
        <div className={classes.post_new_bottom}>
          <FontAwesomeIcon icon={faImage} className={classes.post_new_icon} />
          <FontAwesomeIcon icon={faVideo} className={classes.post_new_icon} />
          <button>CREATE</button>
        </div>
      </Card>
    </div>
  );
};

export default NewPost;
