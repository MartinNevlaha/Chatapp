import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./FriendRequest.module.scss";
import Button from "../UI/Button/Button";
import { parseDateTime } from "../../utils/utilities";

const FriendRequests = ({ pendingRequests, handleFriendRequest }) => {
  const { t } = useTranslation();

  FriendRequests.propTypes = {
    pendingRequests: PropTypes.array,
    handleFriendRequest: PropTypes.func,
  };

  return (
    <div className={classes.friendRequest}>
      <div className={classes.friendRequest_header}>
        <h2>{t("friendRequest.title")}</h2>
      </div>
      <div className={classes.friendRequest_request}>
        {pendingRequests.length === 0 ? (
          <p>No requests</p>
        ) : (
          pendingRequests.map((request) => {
            return (
              <div
                className={classes.friendRequest_request_container}
                key={request.id}
              >
                {request.requestor.avatar ? (
                  <div
                    className={classes.friendRequest_request_container_avatar}
                  >
                    <img src={request.requestor.avatar} alt="avatar" />
                  </div>
                ) : (
                  <div className={classes.friendRequest_request_container_icon}>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </div>
                )}
                <div className={classes.friendRequest_request_container_info}>
                  <h3>{request.requestor.fullName}</h3>
                  <p>
                    {t("friendRequest.requestSend")}{" "}
                    {parseDateTime(request.createdAt)}
                  </p>
                </div>
                <div className={classes.friendRequest_request_container_button}>
                  <Button
                    type="button"
                    danger={true}
                    clicked={() => handleFriendRequest(request.id, 2)}
                  >
                    {t("friendRequest.rejectBtn")}
                  </Button>
                  <Button
                    type="button"
                    clicked={() => handleFriendRequest(request.id, 1)}
                  >
                    {t("friendRequest.acceptBtn")}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
