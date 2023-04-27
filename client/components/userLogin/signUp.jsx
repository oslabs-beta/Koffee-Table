import React from 'react';

function SignUp() {
  const signUp = () => {
    const feedback = document.querySelectorAll('.feedback');
    const targets = document.querySelectorAll('.signUp');
    const [username, password, clientID, hostName, port] = targets;
    feedback.forEach((fb) => (fb.style.opacity = 0));

    if (username.value === '' || password.value === '') {
      feedback[2].style.opacity = 1;
      return;
    }

    fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        clientID: clientID.value,
        hostName: hostName.value,
        port: port.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === null) {
          feedback[1].style.opacity = 1;
          return;
        }
        if (!data.err) feedback[0].style.opacity = 1;
      })
      .catch((err) => {
        console.log('error in Login', err);
      });
    targets.forEach((field) => (field.value = ''));
    // username.value = ""
    // password.value = ""
    // clientID.value = ""
    // hostName.value = ""
    // port.value = ""
  };

  return (
    <div id="loginPage">
      <div className="form-wrapper">
        <h1 className="login-header">Sign Up</h1>
        <input
          id="usernameField"
          className="input login signUp"
          placeholder="username"
        />
        <input
          id="passwordField"
          className="input login signUp"
          placeholder="password"
        />
        <input
          id="clientIDField"
          className="input signupUserData signUp"
          placeholder="Client ID - optional"
        />
        <input
          id="hostNameFlied"
          className="input signupUserData signUp"
          placeholder="Host Name - optional"
        />
        <input
          id="portField"
          className="input signupUserData signUp"
          placeholder="Port - optional"
        />
        <button id="loginButton" className="btn login signUp" onClick={signUp}>
          Login
        </button>
        <div>
          <div id="success" className="feedback">
            User created!
          </div>
          <div id="fail" className="feedback">
            User already exists!
          </div>
          <div id="partial" className="feedback">
            Finish the form please!
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
