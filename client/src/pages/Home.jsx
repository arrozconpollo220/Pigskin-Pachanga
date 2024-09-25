import React from 'react';
import logo from '/PSP-Logo-cutout.png'

const Home = () => {

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div></div>
      </div>
      <div></div>
      <img src={logo} class="img-fluid" alt="PSP-logo" style={{ width: "500px", height: "500px" }} />

    </div>
  )
}

export default Home