import React, { useState } from 'react';


function SignUp() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [clientId, setClientId] = useState(null)
  const [hostName, sethostName] = useState(null)
  const [port, setPort] = useState(null)
  const [feedback, setFeedback] =useState(["none", "none", "none"])

  const signUp = () => {
    setFeedback(["none", "none", "none"])
    if (username === null || password === null) {
      setFeedback(["none", "none", "block"])
      return;
    }

    fetch('http://localhost:8080/user', {
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
        console.log(data);
        if (data === null) {
          setFeedback(["none", "block", "none"])
          return;
        }
        if (!data.err) setFeedback(["block", "none", "none"])
      })
      .catch((err) => {
        console.log('error in Login', err);
      });
  };

  return (
    <div id="loginPage">
      <div className="form-wrapper">
        <h1 className="login-header">Sign Up</h1>
        <input
          id="usernameField"
          className="input login signUp"
          placeholder="username"
          onKeyUp={(v)=>setUsername(v.target.value)}
        />
        <input
          id="passwordField"
          className="input login signUp"
          placeholder="password"
          onKeyUp={(v)=>setPassword(v.target.value)}
        />
        <input
          id="clientIDField"
          className="input signupUserData signUp"
          placeholder="Client ID - optional"
          onKeyUp={(v)=>setClientId(v.target.value)}
        />
        <input
          id="hostNameFlied"
          className="input signupUserData signUp"
          placeholder="Host Name - optional"
          onKeyUp={(v)=>sethostName(v.target.value)}
        />
        <input
          id="portField"
          className="input signupUserData signUp"
          placeholder="Port - optional"
          onKeyUp={(v)=>setPort(v.target.value)}
        />
        <button id="loginButton" className="btn login signUp" onClick={signUp}>
          Login
        </button>
          <div id="success" className="feedback" style={{"display": feedback[0]}}>
            User created!
          </div>
          <div id="fail" className="feedback" style={{"display": feedback[1]}}>
            User already exists!
          </div>
          <div id="partial" className="feedback" style={{"display": feedback[2]}}>
            Finish the form please!
          </div>
      </div>
    </div>
  );
}

export default SignUp;
