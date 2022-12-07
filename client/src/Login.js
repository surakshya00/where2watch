import React, { useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from './Firebase';
import { loginUser } from './actions/users';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [successfulLogIn, setSuccessfulLogIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const logIn = async () => {
    try {
      // authenticate with Firebase
      const credentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      setSuccessfulLogIn(true);
      console.log("signed In");

      if (credentials) {
        // generate cookie for authenticating requests
        const token = await credentials.user.getIdToken();
        const email = credentials.user.email;
        const name = credentials.user.displayName;

        await loginUser(token, email, name);

        // TODO: save user in context
      }
    } catch (error) {
      setLoginError("Incorrect email or password")
      console.log(error.message);
    }
  };


  const [user, setUser] = useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  if (successfulLogIn) {
    return <Navigate to="/" />;
  }


    return (
        <div>
            <body class="backGround">
                <link rel="stylesheet" href="./src/Login.css"></link>
                <div class="container">
                    <form class="form" id="login">

                    <h1 class="form__title">
                        Login
                    </h1>

                    <p class="red">
                        {loginError}
                    </p>

                    <div class="form__message form__message--error"></div>
                    <div class="form__input-group">
                        <input 
                        type="text" 
                        class="form__input" 
                        autofocus placeholder="Enter Email" 
                        onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }} 
                        name="email" 
                        required
                        />
                        <br></br>

                        <div class="form__input-error-message"></div>
                    </div>

                    <div class= "form__input-group">
                        <input 
                        type="password" 
                        class="form__input" 
                        autofocus placeholder="Enter Password" 
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }} 
                        name="psw" 
                        required
                        /> 
                        <br></br>
                        <div class="form__input-error-message"></div>
                    </div>

                    <button id="btnId" type="button" class="form__button" onClick={logIn} >Login</button>

                    <p class="form__text">
                        <a class="form__link" href="SignUp" id="linkCreateAccount">
                            Don't have an account? Create account
                        </a>
                    </p>
                    </form>
                </div>
            </body>
        </div>
    );

}

export default Login;
