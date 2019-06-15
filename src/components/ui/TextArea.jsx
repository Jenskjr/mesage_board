import React from "react";
// css
import { css } from "emotion";

const TextArea = props => {

  return (
    <div className={container()} style={props.style}>
      <textarea
        rows={props.rows || 4}
        name={props.name}  
        onChange={props.handleChange}
        placeholder={props.initText}
        value={props.value}
        defaultValue={props.defaultValue}
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
    border-radius: 5px;
  }
`;

export default TextArea;
