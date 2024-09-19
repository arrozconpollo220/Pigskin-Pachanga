import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    // Authentication calls will be made here...
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Login</div>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className='inputBox'
        />
        <label className='errorLabel'>{emailError}</label>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className='inputBox'
        />
        <span
          className='eyeIcon'
          onClick={toggleShowPassword}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
        <label className='errorLabel'>{passwordError}</label>
      </div>
      <br />
      <div className='inputContainer'>
        <input className='inputButton' type='button' onClick={onButtonClick} value='Log in' />
      </div>
    </div>
  );
};

export default Login;
