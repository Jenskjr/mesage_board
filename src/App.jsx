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

// spinner på log in
// Fjern password fra state, ellers kan den aflures i consollen
// cors policy (ikke prioriteret)

// Version 2.0
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
  useEffect(() => {authToken !== false && 
    getAccount(authToken); 
    getAccounts()}, [authToken])
  
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

  // get accounts
  const getAccounts = async () => {
    const reqUrl = `${baseUrl}/accounts/`;
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

  // login
  const handleLogin = async (validLogin, userName, password) => {
    try {
     if (userName && password && validLogin) {

        const reqUrl = `${baseUrl}/auth/`;
        let { data } = await axios.get(reqUrl, { 'headers': {'userName': userName, 'token': password}});
        setAccount(data)
        console.log(data)

      }
    } catch (error) {
     
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      
      setErrorMessageAuthentication(
        `Kunne ikke logge ind. Prøv igen`
      );
    }
  };

  // logout
  const handleLogOut = () => {
    localStorage.removeItem("authToken")
    setAccount({}, console.log("set account"))
  };

  // update account
  const handleUpdateAccount = async updatedAccount => {
    const reqUrl = `${baseUrl}/account/${updatedAccount.id}`
    try {
      let { data } = await axios.put(reqUrl, updatedAccount);
      setAccount(data);  
    } catch (error) {
      console.log(error)
    }
  }

  // create account
  const handleCreateAccount = async newAccount => {
    const reqUrl = `${baseUrl}/account`;
    try {
      let { data } = await axios.post(reqUrl, newAccount);
      await handleLogin(true, data.name, data.password);
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
        <div>

        <Header account={account.name} handleLogOut={handleLogOut} />
        <Main className="main">
          <Switch>
            <Route
              path="/account"
              render={props => (
                <Account
                  {...props}
                  baseUrl={baseUrl}
                  getAccount={getAccount}
                  createAccount={handleCreateAccount}
                  updateAccount={handleUpdateAccount}
                  account={account}
                  errorMessageAuthentication={errorMessageAuthentication}
                  unsetErrorMessageLogIn={unsetErrorMessageLogIn}
                  errorMessageCreateAccount={errorMessageCreateAccount}
                  unsetErrorMessageCreateAccount = {unsetErrorMessageCreateAccount}
                  handleLogOut={handleLogOut}
                  handleLogin={handleLogin}
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
      </div>
    </Router>
  );
};

const container = () => css`
  padding: 70px 0 120px 0;
  max-width: 540px;
  border: 4px solid gray;
  border-radius: 50px;
  background-color: black;
  margin: 0 auto 0 auto;

  > div {
    max-width: 500px;
    background-color: white;
    margin: 0 auto 0 auto;
    height: 900px;
    overflow-y: auto;
    overFlow-x: auto;
    ::-webkit-scrollbar { 
    display: none; 
}
  }


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
