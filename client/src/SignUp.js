import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";


function SignUp() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [user, setUser] = useState({});

    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
      }, []) 
  


    const register = async() =>  {
        console.log("Here");
        console.log(registerPassword);
        console.log(registerEmail);
        try {
            console.log("BBB");
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log("Bake");
            console.log(user);
        }
        catch (error) {
            console.log(error.message);
        }
        
    };

    const logOut = async () =>  {
        await signOut(auth);
    };

    return (
        <div>
            <div>
                <h1>Sign Up</h1>

                <label ><b>FirstName</b></label>

                <input type="text" placeholder="FirstName" name="fname" required/><br></br>

                <label ><b>LastName</b></label>
                <input type="text" placeholder="LastName" name="lname" required/><br></br>

                <label ><b>Email</b></label>
                <input type="text" placeholder="Enter Email" onChange={(event) => {setRegisterEmail(event.target.value);}} name="email" required/><br></br>

                <label ><b>Password</b></label>
                <input type="password" placeholder="Enter Password" onChange={(event) => {setRegisterPassword(event.target.value);}} name="psw" required/><br></br>

                
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