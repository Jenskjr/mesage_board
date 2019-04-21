import React, { useState } from "react";
// css
import { css } from "emotion";

const TextInput = props => {
  return (
    <div className={container()}>
      <input
        name={props.name}
        type="text"
        onChange={props.handleChange}
        placeholder={props.initText}
        value={props.value} 
        defaultValue={props.defaultValue || ""}
      />
    </div>
  );
};

const container = () => css`
  input {
    border: 1px solid gray;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
  }
`;

export default TextInput;
