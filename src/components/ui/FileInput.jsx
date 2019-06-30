import React, { useState } from "react";
import axios from "axios";
import download from "downloadjs";

// css
import { css } from "emotion";

const FileInput = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({});
  const baseUrl = "https://someurl/";

  const handleSelectedFile = event => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadFile = (event, filename) => {
    event.preventDefault();
    try {
      const url = baseUrl + filename;
      axios.post(url);
    } catch {
      setError(true);
      console.log("Something went wrong");
    }
  };

  async function downloadFile() {
    const res = await "http://something";
  }

  const getFile = filename => {
    try {
      const url = baseUrl + filename;
      axios(url);
    } catch {
      setError(true);
      console.log("Something went wrong");
    }
  };

  return (
    <div className={container()}>
      <input type="file" accept="image/*" onChange={handleSelectedFile} />
      <button onClick={downloadFile}>Upload image</button>
      <div>{file.name}</div>
      {getFile(file.name)}
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

export default FileInput;
