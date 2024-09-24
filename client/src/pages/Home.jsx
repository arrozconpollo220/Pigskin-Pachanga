import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import logo from '/PSP-Logo-cutout.png'

const Home = (props) => {
  // const { loggedIn, email } = props
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate()

  const onButtonClick = () => {
  
    if (loggedIn) {
      Auth.logout();
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div></div>
      </div>
      <div></div>
      <img src={logo} alt="PSP-logo" style={{ width: "500px", height: "500px" }} />

   
    </div>
  )
}

export default Home