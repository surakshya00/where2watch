import React, { useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './Firebase';
import { loginUser } from './actions/users';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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

        await loginUser(token, email, name);

        // TODO: save user in context
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const [user, setUser] = useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  return (
    <div>
      <div>
        <h1>Login</h1>

        <label>
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          name="email"
          required
        />
        <br></br>

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          name="psw"
          required
        />
        <br></br>

        <button onClick={logIn}>Login</button>
      </div>
      <div>
        <h4> User Logged In: </h4>
        {user?.email}
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
}

export default Login;
