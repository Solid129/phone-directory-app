import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isValidPassword = (value) => value.length >= 6;

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
    <form>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" ref={usernameInputRef} />
        {!formInputsValidity.username && <div id="usernameHelp" className="form-text">Username Not Valid</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" ref={passwordInputRef} />
        {!formInputsValidity.password && <div id="passwordHelp" className="form-text danger">Password Must be atleast 6 characters.</div>}
      </div>
      <div className="container">
        <div className="row justify-content-evenly">
          <div className="col-3">
            <button id="login" type="button" className="btn btn-primary" onClick={confirmHandler}>Login</button>
          </div>
          <div className="col-3">
            <button id="signup" type="button" className="btn btn-primary" onClick={confirmHandler}>SignUp</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
