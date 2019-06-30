import React, { useEffect, useState } from "react";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";
import Warning from "./ui/Warning";
import axios from "axios";

//css
import { css } from "emotion";
import { SendIcon, AccountIcon } from "mdi-react";

const MessageBoard = props => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState();

  let timer; 
  
  // componentDidMount
  useEffect(() => {
    getPosts();
  },[]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      clearTimeout(timer) // to avoid memory leaks
    }
  },[])

  // call this function every 30 seconds
  const getPosts =  async () => {
    const reqUrl = `${props.baseUrl}/posts`;
    try {
      let { data } = await axios.get(reqUrl);
      setPosts(data)
    } catch (error) {
      setWarning(true)
    }
    finally {
      timer = setTimeout(() => {
        getPosts();
      }, 10000); 
    }
  };

  const handleFormChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };  
  
  const handlePostSubmit = e => {
    if (message.length > 0) {
      const accountName = props.account.name ? props.account.name: "Ukendt bruger"
      const post = { accountName: accountName, message };
      sendPost(post);
    }
  };

  // try catch mangler her
  const sendPost = async post => {
    const reqUrl = `${props.baseUrl}/post`;
    try {
      let { data } = await axios.post(reqUrl, post)
      setPosts(data)
      setMessage("")
    } 
    catch (error) {
      setWarning(true)
    }
  };

  return (
    <div className={container()}>
      {warning && <Warning validationText={"An error occurred"}/>}
       {/* Form */}
       <form>
          <h2>Skriv en besked</h2>
          <TextArea
            initText="Skriv en besked"
            handleChange={handleFormChange}
            value={message}
          />
          <FormButton
            label={<><SendIcon /> Send </>}
            style={{ marginTop: "1rem" }}
            handleSubmit={e => handlePostSubmit(e)}
          />
        </form>
        {/* MessageList */}
        <div className="list">
            {posts.length > 0 &&
              [...posts].reverse().map((obj, index) => (
                <div className="message" key={index} style={{ marginTop: "1rem" }}>
                  <div className="header">
                    <div>
                      <AccountIcon/>
                    </div>
                    <div className="user-date">
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

    .message {
      padding-top: 1rem;
      border: 1px solid #4877E5;
      border-radius: 10px;
    
      .header {
        display: flex; 

        .user-date {
          font-size: 0.8rem;
          color: darkgray;
        }
  
        svg {
          padding: 0.25rem 1rem 0 1rem;
          height: 2rem;
          width: 2rem;
        }

        p {
          margin:0;
        }
      }

      .body  {
        padding: 0.5rem 0 1rem 4rem;
      }
    }

  }

  .validation-text {
    padding: 1rem 0 1rem 0;
  }
`;

export default MessageBoard;
