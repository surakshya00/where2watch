import React, { useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './Firebase';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const logIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      console.log(user);
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

  console.log(user);

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
