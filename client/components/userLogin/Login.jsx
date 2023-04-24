import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login(props) {
  const navigate = useNavigate();
  const { setUserCluster } = props;

  const login = () => {
    const [username, password] = document.querySelectorAll('.loginField');
    const feedback = document.querySelectorAll('.feedback');

    feedback.forEach((fb) => (fb.style.opacity = 0));

    fetch(`/user/login?username=${username.value}&password=${password.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data) feedback[1].style.opacity = 1;
        else {
          //   {
          //     "_id": "643db3361b4351bb31dfdfee",
          //     "username": "newUser",
          //     "password": "pass",
          //     "clientID": "someID",
          //     "hostName": "someHostname",
          //     "port": 2,
          //     "__v": 0
          // }

          setUserCluster({
            clientID: clientID,
            hostName: hostName,
            port: port,
          });

          navigate('/connectKafka');
          feedback[0].style.opacity = 1;
        }
      })
      .catch((err) => console.log('error in login fetch', err));
  };

  return (
    // <div id='loginPage' >
    //   <h1>Login here</h1>
    //   <input id="usernameField" className="input login loginField" type="text" placeholder="username"/>
    //   <input id="passwordField" className="input login loginField" type="text" placeholder="password"/>
    //   <button id="loginButton" className="btn login" onClick={login}>Login</button>
    //   <Link to="/signUp">Sign up here</Link>
    //   <div>
    //     <div id="success" className='feedback'>Logged in</div>
    //     <div id="fail" className='feedback'>Incorrect login credentials!</div>
    //   </div>
    // </div>
    <div id="loginPage">
      <Form>
        <h1 className="login-header">Login</h1>
        <Form.Group
          className="mb-3 input-wrapper"
          controlId="formBasicUsername"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            className="input login loginField"
          />
        </Form.Group>

        <Form.Group
          className="mb-3 input-wrapper"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            className="input login loginField"
          />
        </Form.Group>
        <Form.Group className="submit-wrapper">
          <Button
            variant="primary"
            type="submit"
            onClick={login}
            id="loginButton"
            className="btn login"
          >
            Submit
          </Button>
          <div>
            Don't have an account? <Link to="/signUp">Sign up here</Link>
          </div>
        </Form.Group>
        <div>
          <div id="success" className="feedback">
            Logged in
          </div>
          <div id="fail" className="feedback">
            Incorrect login credentials!
          </div>
        </div>
      </Form>
    </div>
  );
}
export default Login;
