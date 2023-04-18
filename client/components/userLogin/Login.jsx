import React from "react";
import { Link, useNavigate } from "react-router-dom";



function Login() {
  const navigate = useNavigate()

  const login = () => {
    const [username, password] = (document.querySelectorAll('.loginField'))
    const feedback = document.querySelectorAll('.feedback')

    feedback.forEach(fb => fb.style.opacity = 0)

    fetch(`/user/login?username=${username.value}&password=${password.value}`)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      if(!data) feedback[1].style.opacity = 1
      else {
        navigate('/connectKafka')
        feedback[0].style.opacity = 1;
      }
    })
    .catch((err)=> console.log('error in login fetch', err))
  }

  return (
    <div id='loginPage' >
      <h1>Login here!</h1>
      <input id="usernameField" className="login loginField" type="text" placeholder="username"/>
      <input id="passwordField" className="login loginField" type="text" placeholder="password"/>
      <button id="loginButton" className="login" onClick={login}>Login</button>
      <Link to="/signUp">Sign up here!</Link>
      <div>
        <div id="success" className='feedback'>Logged in</div>
        <div id="fail" className='feedback'>Incorrect login credentials!</div>
      </div>
    </div>

  )
}
export default Login;