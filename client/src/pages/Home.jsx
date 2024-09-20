import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = (props) => {
  // const { loggedIn, email } = props
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
    if (loggedIn) {
      Auth.logout();
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
      </div>
    </div>
  )
}

export default Home