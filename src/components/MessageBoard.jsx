import React, { Component, useEffect, useState } from "react";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";
import axios from "axios";

//css
import { css } from "emotion";
import { SendIcon, AccountIcon } from "mdi-react";

const MessageBoard = props => {
  const [posts, setPosts] = useState([]);
  //const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const [validationText, setValidationText] = useState(""); 
  let timer; 
  
  // componentDidMount
  useEffect(() => {
    console.log("Component did mount")
    getPosts();
  },[]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      clearTimeout(timer) // to avoid memory leaks
    }
  },[])

  const getPosts =  async () => {
    console.log("Call me every 30 seconds");
    const reqUrl = `${props.baseUrl}/posts`;

    await axios
      .get(reqUrl)
      .then(
        function(response) {
          setPosts(response.data);
        }.bind(this) // In axios this refers to axios not the class. Solved with bind(this) Har jeg stadig brug for den i functional component
      )
      .catch(function(error) {
        console.log(error);
      });
      timer = setTimeout(() => {
        getPosts();
      }, 10000); 
  };

  const handleFormChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };  
  
  const handlePostSubmit = e => {
    e.preventDefault();
    setValidationText("");
    message === "" &&
      setValidationText("Besked mangler at blive udfyldt");
    if (message.length > 0) {
      const thisMessage = message; // copy
      const thisProfileName = props.account.name ? props.account.name: "Ukendt bruger"
      const post = { profileName: thisProfileName, message: thisMessage };
      sendPost(post);
    }
  };

  const sendPost = async post => {
    const reqUrl = `${props.baseUrl}/post`;

    await axios
      .post(reqUrl, post)
      .then(
        function(response) {
          setPosts(response.data);
          setMessage("");
        }.bind(this) // In axios this refers to axios not the class. Solved with bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className={container()}>
       {/* Form */}
       <form>
          <h2>Skriv en besked</h2>
          <TextArea
            initText="Skriv en besked"
            handleChange={handleFormChange}
            message={message}
          />
          <FormButton
            label={<><SendIcon /> Send </>}
            style={{ marginTop: "1rem" }}
            handleSubmit={e => handlePostSubmit(e)}
          />
        </form>
        {/* Validation */}
        {validationText && (
          <div className="validation-text">{validationText}</div>
        )}
        {/* MessageList */}
        <div className="list">
            {posts.length > 0 &&
              [...posts].reverse().map((obj, index) => (
                <div className="message" key={index} style={{ marginTop: "1rem" }}>
                  <div className="header">
                    <div>
                      <AccountIcon/>
                    </div>
                    <div>
                      <p>{obj.profileName !== "undefined" || undefined ? obj.profileName: "Ukendt bruger"}</p>
                      <p>{obj.dateTime}</p>
                    </div>
                  </div>
                  <div className="body">
                    {obj.message}
                  </div>
                </div>
              ))}
          </div>

    </div>
  )
}

const container = () => css`
  .list {
    margin-top: 1rem;

    .header {
      display: flex; 
    
      svg {
        padding: 0.25rem 0.5rem 0 0;
        font-size: 1.5rem;
        height: 40px;
        width: 40px;
      }

      p {
        margin:0;
      }
    }

    .body  {
      padding-top: 0.5rem;
    }

    .message {
      padding-top: 1rem;
    }
  }

  .validation-text {
    padding: 1rem 0 1rem 0;
  }
`;

export default MessageBoard;
