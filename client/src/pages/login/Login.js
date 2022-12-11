import React, { useContext, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../auth/Firebase';
import { loginUser } from '../../actions/users';
import './Login.css';
import { AuthContext } from '../../providers/auth';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { setUser } = useContext(AuthContext);

  const logIn = async () => {
    try {
      // authenticate with Firebase
      const credentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );

      if (credentials) {
        // generate cookie for authenticating requests
        const token = await credentials.user.getIdToken();
        const email = credentials.user.email;
        const name = credentials.user.displayName;

        const loggedInUser = await loginUser(token, email, name);
        setUser(loggedInUser);
      }
    } catch (error) {
      setLoginError('Incorrect email or password');
      console.log(error.message);
    }
  };

  return (
    <div className="backGround">
      <div className="container">
        <form className="form" id="login">
          <h1 className="form__title">Login</h1>

          <p className="red">{loginError}</p>

          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              type="text"
              className="form__input"
              autoFocus
              placeholder="Enter Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
              name="email"
              required
            />
            <br></br>

            <div className="form__input-error-message"></div>
          </div>

          <div className="form__input-group">
            <input
              type="password"
              className="form__input"
              autoFocus
              placeholder="Enter Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
              name="psw"
              required
            />
            <br></br>
            <div className="form__input-error-message"></div>
          </div>

          <button
            id="btnId"
            type="button"
            className="form__button"
            onClick={logIn}
          >
            Login
          </button>

          <p className="form__text">
            <a className="form__link" href="SignUp" id="linkCreateAccount">
              Don't have an account? Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
