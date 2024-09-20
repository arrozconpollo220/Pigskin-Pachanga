import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Auth from '../utils/auth';
import './login.css';



const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.login.token);

      // Navigate only after successful login
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

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
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <main className="mainContainer">
      <div className="col-12 col-lg-10">
        <div className="titleContainer">
          <h4>Login</h4>
        </div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className='inputContainer'>
              <input
                value={formState.email}
                placeholder="Enter your email here"
                className="inputBox"
                onChange={handleChange}
                name="email"
                type="email"
              />
              <label className='errorLabel'>{emailError}</label>
            </div>

            <div className='inputContainer'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formState.password}
                placeholder="Enter your password here"
                onChange={handleChange}
                className="inputBox"
                name="password"
              />
              <span
                className='eyeIcon'
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              <label className='errorLabel'>{passwordError}</label>
            </div>

            <div className='inputContainer'>
              <button
                className="inputButton"
                type="submit"
                onClick={onButtonClick}
                style={{ cursor: 'pointer' }}

              >
                Log In
              </button>
              <p>...or <a href="./signup">sign up</a>!</p>
            </div>
          </form>

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;