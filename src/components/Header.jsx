import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, AccountIcon, MessageIcon } from "mdi-react";
import { css } from "emotion";
import FormButton from "./ui/FormButton";

//{}

const Header = props => {
  const [logOutButton, setLogOutButton] = useState(false);

  return (
    <div className={container()}>
    <header>
      <div>
        <Link to="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
      </div>
      <div>
        <Link to="/account">
          <AccountIcon />
          <span>Account</span>
        </Link>
      </div>
      <div>
        <Link to="/messages">
          <MessageIcon />
          <span>Messages</span>
        </Link>
      </div>
      {props.account && (
        <div className="profile" onClick={() => setLogOutButton(true)}>
          <AccountIcon /> {props.account}
        </div>
      )}
    </header>
    {props.account && logOutButton === true && (
    <nav>
      <div className="right">
        <button onClick={props.handleLogOut}>
          LogOut
        </button>
      </div>
    </nav>
    )}
    </div>
  );
};

const container = () => css`
  header {
    display: flex;
  }
  
  .profile {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  nav {
    display: flex;
    .right {
      margin-left: auto;
      margin-right: 1rem;

      button {
        all: unset;
        text-decoration: none;
        cursor: pointer;
        padding: 0.5rem;
        svg {
          margin-right: 1rem;
        }
      }
    }
  }
`;

export default Header;
