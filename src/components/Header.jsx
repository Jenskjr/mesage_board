import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, AccountIcon, MessageIcon } from "mdi-react";
import { css } from "emotion";

//{}

const Header = props => {
  return (
    <header className={container()}>
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
        <div className="profile">
          <AccountIcon /> {props.account}
        </div>
      )}
    </header>
  );
};

const container = () => css`
  .profile {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`;

export default Header;
