import React, { useState } from "react";
// css
import { css } from "emotion";

const FormButton = props => {
  return (
    <div className={container()} style={props.style}>
      <button onClick={props.handleSubmit}>
        {props.iconLeft && props.iconLeft}
        {props.label}
      </button>
    </div>
  );
};

const container = () => css`
  button {
    all: unset;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 1px solid gray;
    background-color: white;
    color: black;
    padding: 1rem 0 1rem;
    svg {
      margin-right: 1rem;
    }
  }
`;

export default FormButton;
