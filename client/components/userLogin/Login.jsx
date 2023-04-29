import React, { useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Login(props) {
  const navigate = useNavigate();
  const { setUserInfo } = props;

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [feedback, setFeedback] =useState(["none", "none"])

  const login = () => {

    setFeedback(["none", "none"])

    fetch(`/user/login?username=${username}&password=${password}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) setFeedback(["none", "block"])
        else {
          setUserInfo([data.clientID, data.hostName, data.port, username]);
          setFeedback(["block", "none"])
          navigate('/connect');
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
            onKeyUp={(v)=>setUsername(v.target.value)}
          />
        </div>

        <div className='mb-3 input-wrapper' controlId='formBasicPassword'>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="input login loginField"
            onKeyUp={(v)=>setPassword(v.target.value)}
          />
        </div>
        <div className='submit-wrapper'>
          <Button
            type="submit"
            onClick={login}
            id='loginButton'
            className='btn login'
          >
            Submit
          </Button>
          <div>
            Don't have an account? <Link to='/signUp'>Sign up here</Link>
          </div>
          <div id="success"  style={{"display": feedback[0]}}>
            {username} logged in
          </div>
          <div id="fail"  style={{"display": feedback[1]}}>
            Incorrect login credentials!
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
