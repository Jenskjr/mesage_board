import React from "react";
// css
import { css } from "emotion";

const FormButton = props => {
  return (
    <div className={container()} style={props.style}>
      <button onClick={e => {e.preventDefault(); props.handleSubmit && props.handleSubmit(e)}}>
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
    border: 2px solid #4877E5;
    border-radius: 5px;
    background-color: white;
    color: black;
    padding: 1rem 0 1rem;
    svg {
      margin-right: 1rem;
    }
  }
`;

export default FormButton;
