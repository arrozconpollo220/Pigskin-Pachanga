import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Auth from "../utils/auth";

const LogoutButton = (props) => {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  const onButtonClick = () => {
    Auth.logout();
    navigate("/");
  };

  return (
    <>
      {loggedIn && (
        <Button
          variant="primary"
          className={`m-3 ${props.className}`}
          onClick={onButtonClick}
          style={{ padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto", background: "#000000"}}
        >
          Log out
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
