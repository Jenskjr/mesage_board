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
import Frontpage from "./components/Home";
import UserAccount from "./components/UserAccount";
import Account from "./components/Account";

// version 1.0

// Flere oplysninger i profiler (igang)
// Fejl adgangkode mangler at blive udfyldt
// Rediger profil mangler
// password
// cors policy
// setTimeOut inserts 8????

// Version 2.0
// spinner på load a data
// Implement redux state managaer
// implementere database

// Version 3.0
// image upload

// Version 4.0
// Database connection

const App = () => {
  const baseUrl = `http://localhost:5000/api`;
  let authToken = localStorage.getItem("authToken") || false;
  const [account, setAccount] = useState({}); 
  const [accounts, setAccounts] = useState({});
  const [userAccount, setUserAccount] = useState({})
  const [errorMessageCreateAccount, setErrorMessageCreateAccount] = useState(
    undefined
  );
  const [errorMessageAuthentication, setErrorMessageAuthentication] = useState(
    undefined
  );
  
  // on StateDidUpdate
  useEffect(() => {account.id ? localStorage.setItem("authToken", account.id): localStorage.removeItem("authToken")}, [account])
  useEffect(() => {authToken !== false && getAccount(authToken); getAccounts(); console.log("Authtoken: " + authToken); console.log("Account: "); console.log(account)}, [authToken])
  
  // get account
  const getAccount = async (id) => {
    const reqUrl = `${baseUrl}/account/${id}`;
    try {
      let { data } = await axios.get(reqUrl);
      await setAccount(data)  
    } catch (error) {
      console.log(error)
    } 
  }
  
    // der er noget galt med id 1 - 5
   // get account
   const getUserAccount = async (id) => {
    const reqUrl = `${baseUrl}/account/${id}`;

    try {
      let { data } = await axios.get(reqUrl);
      setUserAccount(data)  
    } catch (error) {
      console.log(error)
    } 
  }

  // get accounts
  const getAccounts = async () => {
    const reqUrl = `${baseUrl}/accounts/`;
    console.log("get accounts")
    try {
      let { data } = await axios.get(reqUrl);
      if (account.id) {
        let dataExeptAuthed;
        dataExeptAuthed = data.filter(x => x.id !== account.id);
        setAccounts(dataExeptAuthed)
      }
      else setAccounts(data)
    } catch (error) {
      console.log(error)
    } 
  } 

  // login
  const handleLogIn = async (validLogin, userName, password) => {
    try {
     if (validLogin === true && userName && password) {
        const reqUrl = `${baseUrl}/auth/${userName}`;
        let { data } = await axios.get(reqUrl);

        getAccount(data.id)
      }
    } catch (error) {
      console.log(error);
      setErrorMessageAuthentication(
        "Ups ... noget gik galt. Prøv igen eller kontakt din administrator."
      );
    }
  };

  // logout
  const handleLogOut = () => {
    console.log("log out")
    localStorage.removeItem("authToken")
    setAccount({}, console.log("set account"))
  };

  // create account
  const handleCreateAccount = async newAccount => {
    const reqUrl = `${baseUrl}/account`;

    try {
      let { data } = await axios.post(reqUrl, newAccount);
      await handleLogIn(true, data.name, "dfgfdgfdg");
    } catch (error) {
      console.log(error);
      setErrorMessageCreateAccount(
        "Ups ... noget gik galt. Prøv igen eller kontakt din administrator."
      );
    }
  };

  const unsetErrorMessageLogIn = () => {
    setTimeout(() => {
      setErrorMessageAuthentication(undefined)
    }, 10000);
  }

  const unsetErrorMessageCreateAccount = () => {
    setTimeout(() => {
      setErrorMessageCreateAccount(undefined)
    }, 10000);
  }

  return (
    <Router>
      <div className={container()}>
        <Header account={account.name} handleLogOut={handleLogOut} />
        <Main className="main">
          <Switch>
            <Route
              path="/account"
              render={props => (
                <Account
                  {...props}
                  createAccount={handleCreateAccount}
                  baseUrl={baseUrl}
                  errorMessageAuthentication={errorMessageAuthentication}
                  unsetErrorMessageLogIn={unsetErrorMessageLogIn}
                  errorMessageCreateAccount={errorMessageCreateAccount}
                  unsetErrorMessageCreateAccount = {unsetErrorMessageCreateAccount}
                  getAccount={getAccount}
                  account={account}
                  handleLogOut={handleLogOut}
                  handleLogIn={handleLogIn}
                />
              )}
            />
            <Route path="/user/:id" 
              render={props => (
                <UserAccount
                  {...props}
                  getUserAccount={getUserAccount}
                  userAccount={userAccount} 
                />
              )}
            />
            <Route
              path="/messages"
              render={props => (
                <MessageBoard
                  {...props}
                  account={account}
                  baseUrl={baseUrl}
                />
              )}
            />
            <Route exact path="/frontpage" // Frontpage eller Home ?
            render={props => (
              <Frontpage
                {...props}
                getAccounts={getAccounts}
                accounts={accounts}
              />
            )} 
            />
            <Route path="/" render={() => <Redirect to="/frontpage" />} />
          </Switch>
        </Main>
      </div>
    </Router>
  );
};

const container = () => css`
  max-width: 500px;
  border: 1px solid gray;
  margin: 2rem auto 0 auto;
  height: 1000px;
  overflow: scroll;

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
