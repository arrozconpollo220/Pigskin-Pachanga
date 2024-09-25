import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('You are offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');

    const { email, password } = formState;

    // Validate email and password
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      // Navigate only after successful login
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <main className="mainContainer">
      <div className="col-12 col-lg-10" style={{ padding: '10px' }}>
        <div className="titleContainer">
          <h4>Login</h4>
        </div>

        {isOnline ? (
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
                  placeholder="Enter your password"
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
                  style={{ cursor: 'pointer' }}
                >
                  Log In
                </button>
                <p style={{ marginTop: '30px' }}>...or <a href="./signup">sign up</a>!</p>
              </div>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3>You are offline!</h3>
            <img src='/referee.png' alt='A picture of a referee' style={{width: '100%'}} class="img-fluid"/>
            <p>This feature is only available while connected to the internet.</p>
            <p>Try again in a few moments!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
