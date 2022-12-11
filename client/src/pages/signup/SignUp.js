import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../auth/Firebase';
import { saveUserToDatabase } from '../../actions/users';
import '../login/Login.css';

function SignUp() {
  const [registerFirstName, setFirstName] = useState('');
  const [registerLastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      await saveUserToDatabase(
        registerEmail,
        registerFirstName,
        registerLastName,
      );
      setSuccessfulSignUp(true);
    } catch (error) {
      alert(error.message);
    }
  };

  if (successfulSignUp) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <body class="backGround">
        <link rel="stylesheet" href="../Login/Login.css"></link>

        <div class="container">
          <form class="form" id="createAccount">
            <h1 class="form__title">Sign Up</h1>

            <div class="form__message form__message--error"></div>

            <div class="form__input-group">
              <input
                type="text"
                class="form__input"
                autofocus
                placeholder="FirstName"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                name="fname"
                required
              />
              <br></br>
              <div class="form__input-error-message"></div>
            </div>

            <div>
              <input
                type="text"
                class="form__input"
                placeholder="LastName"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                name="lname"
                required
              />
              <br></br>
              <div class="form__input-error-message"></div>
            </div>

            <div>
              <input
                type="text"
                class="form__input"
                placeholder="Enter Email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                name="email"
                required
              />
              <br></br>
              <div class="form__input-error-message"></div>
            </div>

            <div>
              <input
                type="password"
                class="form__input"
                placeholder="Enter Password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                name="psw"
                required
              />
              <br></br>
              <div class="form__input-error-message"></div>
            </div>

            <button
              id="btnId"
              type="button"
              class="form__button"
              onClick={register}
            >
              Sign Up
            </button>

            <p class="form__text">
              <a class="form__link" href="Login" id="linkLogin">
                Already have an account? Sign in
              </a>
            </p>
          </form>
        </div>
      </body>
    </div>
  );
}
export default SignUp;
