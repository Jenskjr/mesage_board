import React, { useState } from "react";
// css
import { css } from "emotion";

const TextArea = props => {
  const [value, setValue] = useState();

  return (
    <div className={container()} style={props.style}>
      <textarea
        rows="4"
        name={props.name}  
        onChange={props.handleChange}
        placeholder={props.initText}
        value={props.message}
      />
    </div>
  );
};

const container = () => css`
  textarea {
    border: 1px solid gray;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
`;

export default TextArea;
