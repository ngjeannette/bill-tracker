import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "./component/Homepage";
import UserNamePage from "./component/Usernamepage";
import LoginPage from "./component/Loginpage";
import CreateBillPage from "./component/Createbillpage";
import TrackPage from "./component/Trackpage";
/*eslint-disable */
function App() {
  const [name, setName] = useState(null);
  const [displayLogin, setDisplayLogin] = useState(true);
  const [displaySignIn, setDisplaySignin] = useState(true);
  const [displayLogout, setDisplayLogout] = useState(false);

  let updateData = (value) => {
    setName(value[0].username);
    setDisplayLogin(false);
    setDisplaySignin(false);
    setDisplayLogout(true);
  };

  let loggingOut = () => {
    setName(null);
    setDisplayLogin(true);
    setDisplaySignin(true);
    setDisplayLogout(false);
  };

  useEffect(() => {}, [name]);

  return (
    <>
      <Router>
        <div className={`ui secondary menu`}>
          <a className="item" href="https://flaviocopes.com/sample-app-ideas/">
            Project 4
          </a>
          <Link to="/" className="item">
            Home
          </Link>
          <Link to="/create" className="item">
            Create Bills
          </Link>
          <Link to="/track" className="item">
            Track Bills
          </Link>

          <div className="right menu">
            {name && <p className="item">Welcome {name}</p>}
            {displayLogin && (
              <Link to="/signup" className="item">
                {" "}
                Sign Up
              </Link>
            )}
            {displaySignIn && (
              <Link to="/login" className="item">
                {" "}
                Login
              </Link>
            )}
            {displayLogout && (
              <a
                className="item"
                onClick={() => {
                  loggingOut();
                }}
              >
                Log out
              </a>
            )}
          </div>
        </div>
        <div className="content-page">
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/edit/:id" />
          <Route
            path="/create"
            component={() => (
              <CreateBillPage updateData={updateData} name={name} />
            )}
          />
          <Route path="/signup" component={UserNamePage} />
          <Route
            path="/login"
            component={() => <LoginPage updateData={updateData} />}
          />
          <Route
            path="/track"
            component={() => <TrackPage updateData={updateData} name={name} />}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
