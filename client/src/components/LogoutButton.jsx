import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const LogoutButton = () => {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  const onButtonClick = () => {
    Auth.logout();
    navigate('/'); 
  };

  return (
    <>
      {loggedIn && (
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value="Log out"
        />
      )}
    </>
  );
};

export default LogoutButton;
