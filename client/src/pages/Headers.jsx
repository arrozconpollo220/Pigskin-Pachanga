import React from 'react';
import Auth from '../utils/auth';

function Header() {

  const loggedIn = Auth.loggedIn();
  // const userName = loggedIn ? Auth.getProfile().data.name : '';
  const userName = 'user';
  console.log(userName);

  return (
    <header>
      <h1>Chicharron de Puerco - Pachanga</h1>
      
      {loggedIn ? (
        <p>Hello {userName}!</p>
      ) : (
        <p>Log in or sign up!</p>
      )}
    </header>
  );
}

export default Header; 