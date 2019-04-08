import React, { Component } from "react";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";
import axios from "axios";

//css
import { css } from "emotion";
import { SendIcon, AccountIcon } from "mdi-react";

//{}

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {},
      message: "",
      valTxtMessage: ""
    };
  }

  // UseEffect
  componentDidMount() {
    this.getPostsRequest();
  }

  handleFormChange = e => {
    e.preventDefault();
    this.setState({ message: e.target.value });
  };

  handlePostSubmit = e => {
    e.preventDefault();
    this.setState({ valTxtMessage: "" });
    this.state.message === "" &&
      this.setState({ valTxtMessage: "Besked mangler at blive udfyldt" });
    if (this.state.message.length > 0) {
      const thisMessage = this.state.message;
      const thisProfileName =
        this.props.account.name ? this.props.account.name: "Ukendt bruger"
      const post = { profileName: thisProfileName, message: thisMessage };
      this.sendPostRequest(post);
    }
  };

  getPostsRequest = async () => {
    console.log("Call me every 30 seconds");
    const reqUrl = `${this.props.baseUrl}/posts`;

    await axios
      .get(reqUrl)
      .then(
        function(response) {
          this.setState({ posts: response.data });
        }.bind(this) // In axios this refers to axios not the class. Solved with bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(() => {
      this.getPostsRequest();
    }, 30000);
  };

  sendPostRequest = async post => {
    const reqUrl = `${this.props.baseUrl}/post`;

    await axios
      .post(reqUrl, post)
      .then(
        function(response) {
          this.setState({ posts: response.data });
          this.setState({ message: "" });
        }.bind(this) // In axios this refers to axios not the class. Solved with bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className={container()}>
          <form>
            <h2>Skriv en besked</h2>
            <TextArea
              initText="Skriv en besked"
              handleChange={this.handleFormChange}
              message={this.state.message}
            />
            <FormButton
              label={
                <>
                  <SendIcon /> Send
                </>
              }
              style={{ marginTop: "1rem" }}
              handleSubmit={e => this.handlePostSubmit(e)}
            />
          </form>

          {this.state.valTxtMessage && (
            <div className="validation-text">{this.state.valTxtMessage}</div>
          )}

          <div className="list">
            {this.state.posts.length > 0 &&
              [...this.state.posts].reverse().map((obj, index) => (
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
      </>
    );
  }
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
