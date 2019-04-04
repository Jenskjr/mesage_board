import React, { useState, useEffect } from "react";
// router
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
// css
import { css } from "emotion";
// components
import axios from "axios";
import Header from "./components/Header";
import Main from "./components/Main";
import MessageBoard from "./components/MessageBoard";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Account from "./components/Account";

//{}
//[]
//||

// version 1.
// Form validation
// Storage of encrypted passwords
// Done: Secure storage of user data in localstorage
// cors policy
// profileimages. Can be a svg temporarily
// Github repository
// Profile image gif

// Version 2.
// Implement redux as state managaer

// Bug ved refresh, når man ikke er logget ind -> cleary

const App = () => {
  const baseUrl = `http://localhost:5000/api`;
  let initIsAuthed = JSON.parse(localStorage.getItem("isAuthed") || false);
  let initProfileName = localStorage.getItem("profileName");
  const [authed, setAuthed] = useState({
    isAuthed: initIsAuthed,
    profileName: initProfileName
  });
  const [errorMessageCreateAccount, setErrorMessageCreateAccount] = useState(
    undefined
  );
  const [errorMessageAuthentication, setErrorMessageAuthentication] = useState(
    undefined
  );

  useEffect(() => {
    localStorage.setItem("isAuthed", authed.isAuthed);
    localStorage.setItem("profileName", authed.profileName);
  }, [authed]);

  const handleAuthentication = async (validLogin, userName, password) => {
    try {
      if (validLogin === false) {
        setAuthed({ isAuthed: false, authedProfile: undefined });
      } else if (validLogin === true && userName && password) {
        const reqUrl = `${baseUrl}/auth/${userName}`;
        let { data } = await axios.get(reqUrl);
        setAuthed({ isAuthed: true, profileName: data.name });
      }
    } catch (error) {
      console.log(error);
      setErrorMessageAuthentication(
        "Ups ... noget gik galt. Prøv igen eller kontakt din administrator."
      );
    }
  };

  const handleLogOut = evt => {
    evt.preventDefault();
    setAuthed({ isAuthed: false, profileName: undefined });
  };

  const handleCreateAccount = async newAccount => {
    const reqUrl = `${baseUrl}/profiles`;

    try {
      let { data } = await axios.post(reqUrl, newAccount);
      //console.log(data);
      await handleAuthentication(true, data.name, "dfgfdgfdg");
    } catch (error) {
      console.log(error);
      setErrorMessageCreateAccount(
        "Ups ... noget gik galt. Prøv igen eller kontakt din administrator."
      );
    }
  };

  return (
    <Router>
      <div className={container()}>
        <Header authed={authed} />
        <Main className="main">
          <Switch>
            <Route
              path="/account"
              render={props => (
                <Account
                  {...props}
                  authed={authed}
                  setAuthed={handleAuthentication}
                  createAccount={handleCreateAccount}
                  handleLogOut={handleLogOut}
                  baseUrl={baseUrl}
                  errorMessageCreateAccount={errorMessageCreateAccount}
                  errorMessageAuthentication={errorMessageAuthentication}
                />
              )}
            />
            <Route path="/profile/:id" component={Profile} />
            <Route
              path="/messages"
              render={props => (
                <MessageBoard
                  {...props}
                  authed={authed}
                  isAuthed={authed.isAuthed}
                  authedProfile={authed.profileName}
                  baseUrl={baseUrl}
                />
              )}
            />
            <Route exact path="/frontpage" component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/" render={() => <Redirect to="/frontpage" />} />
          </Switch>
        </Main>
      </div>
    </Router>
  );
};

const container = () => css`
  header {
    display: flex;

    div {
      padding: 1rem;
    }

    span {
      vertical-align: super;
    }

    svg {
      padding-right: 1rem;
    }
  }
`;

export default App;
