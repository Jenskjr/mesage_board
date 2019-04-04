import React from "react";
// css
import { css } from "emotion";

const Header = props => {
  return <main className={container()}> {props.children}</main>;
};

const container = () =>
  css`
    padding: 1rem;
  `;

export default Header;
