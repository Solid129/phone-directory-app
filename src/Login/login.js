import { useRef, useState } from 'react';
import './login.css';

const isEmpty = (value) => value.trim() === '';
const isValidPassword = (value) => value.length >= 3;

const Login = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    password: true,
  });

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredUsernameIsValid = !isEmpty(enteredUsername);
    const enteredPasswordIsValid = isValidPassword(enteredPassword);

    setFormInputsValidity({
      username: enteredUsernameIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid =
      enteredUsernameIsValid &&
      enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    } else {
      event.target.id === 'signup'
        ? props.onSignUp(enteredUsername, enteredPassword)
        : props.onLogin(enteredUsername, enteredPassword);
    }
  };

  return (
    <div className="loginFormDiv">
      <form className="loginForm">
        <div>
          <label htmlFor='username'>Username</label><br />
          <input type='text' id='username' ref={usernameInputRef} className="username" />
          {!formInputsValidity.username && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid username!</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label><br />
          <input type='password' id='password' ref={passwordInputRef} className="password" />
          {!formInputsValidity.password &&
            <div>
              <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid password!<br />
              Your password must:
              Contain at least 3 characters</p>
            </div>
          }
        </div>
        <div style={{ marginTop: 10 }}>
          <button id="login" style={{ height: 30, width: 60, textAlign: 'center', display: 'inline-block', marginRight: '10%' }} onClick={confirmHandler}>{"LogIn"}</button>
          <button id="signup" style={{ height: 30, width: 60, display: 'inline-block', marginLeft: '10%' }} onClick={confirmHandler} title='Add New Contact'>{"SignUp"}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
