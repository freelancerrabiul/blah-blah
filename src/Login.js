import "./Login.css";
import { auth } from "./firebase";
// import firebase from "firebase";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault(); //stop refresh    
      auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/feed");
      })
      .catch((error) => alert(error.message));
  };

  const register = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
       if (auth) {

         alert("authentication success")
         history.push("/profile_info");
      }
      }).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />

          <h5>Password</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
          <button onClick={login} type="submit" className="login__signInButton">
            Log In
          </button>
        </form>
        <p>
          By signing-in you agree to blah blah's Conditions of Use & Sales.
          Plese see our Privacy Notice,our Cookies Notice and our Interest-Based
          Ads Notice.
          <button onClick={register} className="login__registerButton">
            Create My Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
