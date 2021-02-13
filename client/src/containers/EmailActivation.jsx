import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Card from "../components/UI/Card/Card";
import Button from "../components/UI/Button/Button";

const EmailActivation = () => {
  const { token } = useParams();

  return (
    <Card>
      <h2>Please activate your accont click on Activate button</h2>
      <Button clicked={() => console.log(token)}>Activate</Button>
    </Card>
  );
};

export default EmailActivation;
