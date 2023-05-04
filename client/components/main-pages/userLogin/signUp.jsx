import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [hostName, sethostName] = useState(null);
  const [port, setPort] = useState(null);
  const [feedback, setFeedback] = useState(['none', 'none', 'none']);
  const navigate = useNavigate();

  const signUp = () => {
    setFeedback(['none', 'none', 'none']);
    if (username === null || password === null) {
      setFeedback(['none', 'none', 'block']);
      return;
    }
    if(!checkPassword(password)) return setFeedback(['block', 'none', 'none'])

    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        clientID: clientId,
        hostName: hostName,
        port: port,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          setFeedback(['none', 'block', 'none']);
          return;
        }
        if (!data.err) {
          navigate('/login');
        } 
      })
      .catch((err) => {
        console.log('error in Login', err);
      });
  };


  const checkPassword = (str) => {
    console.log(str)
    if (str.length < 7) return false;
    
    let includesNum = false;
    let includesCap = false;
    let includeSpecial = false;

    for (let i = 0; i < str.length; i++) {

      if(str[i] % 1 === 0) includesNum = true;
      else {
        if(!(97<=str[i].toLowerCase().charCodeAt(0) && str[i].toLowerCase().charCodeAt(0)<=122)) includeSpecial = true;
      }
      if(str[i] !== str[i].toLowerCase()) includesCap = true;
    }
    console.log(includesNum , includesCap , includeSpecial)
    if(includesNum && includesCap && includeSpecial) return true;
    return false;
  }

  return (
    <div id="loginPage">
      <div className="form-wrapper">
        <h1 className="login-header">Sign Up</h1>
        <input
          id="usernameField"
          className="input login"
          placeholder="Enter username"
          type="username"
          onKeyUp={(v) => setUsername(v.target.value)}
        />
        <input
          id="passwordField"
          className="input login"
          placeholder="Enter password"
          type="password"
          onKeyUp={(v) => setPassword(v.target.value)}
        />
        <input
          id="clientIDField"
          className="input signupUserData"
          placeholder="Client ID - optional"
          onKeyUp={(v) => setClientId(v.target.value)}
        />
        <input
          id="hostNameFlied"
          className="input signupUserData"
          placeholder="Host Name - optional"
          onKeyUp={(v) => sethostName(v.target.value)}
        />
        <input
          id="portField"
          className="input signupUserData"
          placeholder="Port - optional"
          onKeyUp={(v) => setPort(v.target.value)}
        />
        <button id="loginButton" className="btn btnx login" onClick={signUp}>
          Login
        </button>
        <div id="fail" className="feedback" style={{ display: feedback[0] }}>
          Password must be at least 7 characters and include an uppercase letter, a number, and a special character.
        </div>
        <div id="fail" className="feedback" style={{ display: feedback[1] }}>
          User already exists!
        </div>
        <div id="partial" className="feedback" style={{ display: feedback[2] }}>
          Finish the form please!
        </div>
      </div>
    </div>
  );
}

export default SignUp;
