import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './Firebase';
import { saveUserToDatabase } from './actions/users';

function SignUp() {
  const [registerFirstName, setFirstName] = useState('');
  const [registerLastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [user, setUser] = useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      console.log(user);
      await saveUserToDatabase(
        registerEmail,
        registerFirstName,
        registerLastName,
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>

        <label>
          <b>FirstName</b>
        </label>

        <input
          type="text"
          placeholder="FirstName"
          name="fname"
          required
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <br></br>

        <label>
          <b>LastName</b>
        </label>
        <input
          type="text"
          placeholder="LastName"
          name="lname"
          required
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <br></br>

        <label>
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
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
            setRegisterPassword(event.target.value);
          }}
          name="psw"
          required
        />
        <br></br>

        <button onClick={register}>Sign Up</button>
      </div>
      <div>
        <h4> User Logged In: </h4>
        {user?.email}
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
}
export default SignUp;
