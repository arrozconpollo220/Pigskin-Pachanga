import React from 'react';
import Auth from '../utils/auth';
import NavBar from './NavBar';
function Header() {

  const loggedIn = Auth.loggedIn();
  const userName = loggedIn ? Auth.getProfile().data?.name : '';
  console.log('USERNAME: ',userName);

  return (
    <header>
      <NavBar/>
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