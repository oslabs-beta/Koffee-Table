import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Login(props) {
  const navigate = useNavigate();
  const { setUserInfo } = props;

  const login = () => {
    const [username, password] = document.querySelectorAll('.loginField');
    const feedback = document.querySelectorAll('.feedback');

    feedback.forEach((fb) => (fb.style.opacity = 0));

    fetch(`/user/login?username=${username.value}&password=${password.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('here is the data in the login fetch request: ', data);
        if (!data) feedback[1].style.opacity = 1;
        else {
          setUserInfo([data.clientID, data.hostName, data.port]);

          navigate('/');
          feedback[0].style.opacity = 1;
        }
      })
      .catch((err) => console.log('error in login fetch', err));
  };

  return (
    <div id='loginPage'>
      <div className='form-wrapper'>
        <h1 className='login-header'>Login</h1>
        <div className='mb-3 input-wrapper' controlId='formBasicUsername'>
          <label>Username</label>
          <input
            type='username'
            placeholder='Enter username'
            className='input login loginField'
          />
        </div>

        <div className='mb-3 input-wrapper' controlId='formBasicPassword'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='input login loginField'
          />
        </div>
        <div className='submit-wrapper'>
          <Button
            variant='primary'
            type='submit'
            onClick={login}
            id='loginButton'
            className='btn login'
          >
            Submit
          </Button>
          <div>
            Don't have an account? <Link to='/signUp'>Sign up here</Link>
          </div>
        </div>
        <div>
          <div id='success' className='feedback'>
            Logged in
          </div>
          <div id='fail' className='feedback'>
            Incorrect login credentials!
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
