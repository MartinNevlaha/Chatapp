import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./EmailActivation.module.scss";

const EmailActivation = ({ activation, loading, history }) => {
  const { token } = useParams();
  const { email } = jwt_decode(token);
  const { t } = useTranslation();

  const handleClick = () => {
    activation(token, history);
  };

  EmailActivation.propTypes = {
    activation: PropTypes.func,
    loading: PropTypes.bool,
    history: PropTypes.node,
  };

  return (
    <Card type="small_card">
      <div className={classes.emailActiv_wrapper}>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className={classes.emailActiv_wrapper_iconWrapper}>
              <FontAwesomeIcon
                icon={faUser}
                size="5x"
                className={classes.emailActiv_wrapper_iconWrapper_icon}
              />
            </div>
            <h2>
              {t("emailActivation.please")} {email} {t("emailActivation.click")}
            </h2>
            <p>{t("emailActivation.msg")}</p>
            <Button clicked={handleClick}>{t("emailActivation.btn")}</Button>
          </React.Fragment>
        )}
      </div>
    </Card>
  );
};

export default withRouter(EmailActivation);
