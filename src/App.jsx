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
import UserAccount from "./components/UserAccount";
import Account from "./components/Account";

// version 1.


// Logud knap i øverste højre hjørne
// Storage of encrypted passwords
// Secure storage of user data in localstorage
// cors policy
// setTimeOut inserts 8????

// Version 2.
// Implement redux state managaer
// implementere database

// Version 3 
// image upload


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

  useEffect(() => {account.id ? localStorage.setItem("authToken", account.id): localStorage.removeItem("authToken")}, [account])

  useEffect(() => {authToken !== false && getAccount(authToken); console.log("Authtoken: " + authToken); console.log("Account: "); console.log(account)}, [authToken])
  
  // get account
  const getAccount = async (id) => {
    const reqUrl = `${baseUrl}/account/${id}`;

    try {
      let { data } = await axios.get(reqUrl);
      setAccount(data)  
    } catch (error) {
      console.log(error)
    } 
  }

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

    try {
      let { data } = await axios.get(reqUrl);
      setAccounts(data)  
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
  const handleLogOut = evt => {
    evt.preventDefault();
    localStorage.removeItem("authToken")
    setAccount({})
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
                  errorMessageCreateAccount={errorMessageCreateAccount}
                  unsetErrorMessageCreateAccount = {unsetErrorMessageCreateAccount}
                  errorMessageAuthentication={errorMessageAuthentication}
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
              <Home
                {...props}
                getAccounts={getAccounts}
                accounts={accounts}
              />
            )} 
            />
            {/* <Route path="/profile/:id" component={UserAccount} /> */}
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
