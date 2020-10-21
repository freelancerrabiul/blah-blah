import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Feed from "./Feed";
import Chat from "./Chat";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileInfo from "./ProfileInfo";

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("user >>>>>>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/feed">
            <Feed />
          </Route>

          <Route path="/chat">
            <Chat />
          </Route>

          <Route path="/profile_info">
            <ProfileInfo />
          </Route>

          <Route exact path="/">
            {user ? <Redirect to="/feed" /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
