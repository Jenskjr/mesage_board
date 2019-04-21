import React, { useState } from "react";
// css
import { css } from "emotion";
import { ErrorIcon } from "mdi-react";

const TextInput = props => {
    const [warning, setWarning] = useState(true)
  
    return (
    <div className={container()}>
      {props.validationText && warning &&
      <p className="error-message">
        <ErrorIcon />
        {props.validationText}
         {/* {setTimeout(() => {
             setWarning(false)
         }, 10000)} */}
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
`;

export default TextInput;
