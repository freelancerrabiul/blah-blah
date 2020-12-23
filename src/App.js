import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Feed from "./Feed";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileInfo from "./ProfileInfo";
import Explore from "./Explore";
import Header from "./Header";
import Notify from "./Notify";
import MyConnection from "./MyConnection";
import MyModalBody from "./MyModalBody";

function App() {
  const [{ user }, dispatch] = useStateValue();

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
        <Header />

        <Switch>
          <Route path="/feed">
            <Feed />
          </Route>

          <Route path="/profile_info">
            <ProfileInfo />
          </Route>

          <Route path="/explore">
            <Explore />
          </Route>

          <Route exact path="/notification">
            <Notify />
          </Route>

          <Route path="/connection">
            <MyConnection />
          </Route>

          <Route path="/mymodalbody">
            <MyModalBody />
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
