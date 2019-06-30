import React, { useState } from "react";
// css
import { css } from "emotion";
import { ErrorIcon } from "mdi-react";

const TextInput = props => {
    const [warning] = useState(true)
  
    return (
    <div className={container()}>
      {props.validationText && warning &&
      <p className="error-message">
        <ErrorIcon />
        {props.validationText}
      </p>
      }
    </div>
  );
};

const container = () => css`
  input {
    border: 1px solid gray;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  svg {
    margin-right: 0.5rem;
    color: darkred;
  }

  .error-message {
    display: flex;
    align-items: center;
    color: darkred;
  }
`;

export default TextInput;
