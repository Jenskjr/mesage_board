import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, AccountIcon, MessageIcon } from "mdi-react";
import { css } from "emotion";

//{}

const Header = props => {
  const [logOutButton, setLogOutButton] = useState(false);

  return (
    <div className={container()}>
    <header>
      <div>
        <Link to="/">
          <HomeIcon />
          <span>Hjem</span>
        </Link>
      </div>
      <div>
        <Link to="/account">
          <AccountIcon />
          <span>Konto</span>
        </Link>
      </div>
      <div>
        <Link to="/messages">
          <MessageIcon />
          <span>Beskeder</span>
        </Link>
      </div>
      {props.account && (
        <div className="profile" onClick={() => setLogOutButton(!logOutButton)}>
          {props.account}
        </div>
      )}
    </header>
    {props.account && logOutButton === true && (
    <nav>
      <div className="right">
        <div onClick={() => {props.handleLogOut(); setLogOutButton(false)}}>
          Log ud
        </div>
      </div>
    </nav>
    )}
    </div>
  );
};

const container = () => css`
  header {
    display: flex;
    background-color: #4877E5;
  
    svg {
      color: white;
    }

    a {
      color: white;
      text-decoration: none;
    }
  
    .profile {
      display: flex;
      margin-left: auto;
      margin-right: 0.5rem;
      color: white;
      font-weight: bold;
    }
  }

  nav {
    display: flex;
    border-bottom: 1px solid #4877E5;
    .right {
      margin-left: auto;
      margin-right: 0.5rem;

      > div {
        cursor: pointer;
        padding: 1rem;
        color: #4877E5;
        svg {
          margin-right: 1rem;
        }
      }
    }
  }
`;

export default Header;
