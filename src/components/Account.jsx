import React, { useState, Component } from "react";
import axios from "axios";
import TextInput from "./ui/TextInput";
import FormButton from "./ui/FormButton";
import FileInput from "./ui/FileInput";

//css
import { css } from "emotion";
import { ErrorIcon } from "mdi-react";
import TextArea from "./ui/TextArea";

//{}
//[]



class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      createAccount: false,
      createAccountName: "",
      createAccountPassword: "",
      createAccountAge: "", 
      createAccountText: "", 
      account: {}
    
    };
  }

  componentDidMount() {
    const {isAuthed, profileId, profileName} = this.props.authed
    isAuthed && profileId && profileName&& this.getProfile(profileId);
  }

  componentWillUnmount() {
    this.setState({account: {}})
  }

  getProfile = async (id) => {
    const reqUrl = `http://localhost:5000/api/profile/${id}`;

    try {
      let { data } = await axios.get(reqUrl);
      console.log("getProfile: " + JSON.stringify(data))
      this.setState({account: data})   
    } catch (error) {
      console.log(error)
    } 
  }

  handleFormChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmitLogin = evt => {
    evt.preventDefault();
    const { loginName, loginPassword } = this.state;

    this.setState({ valTxtPassword: "", valTxtName: "" });
    loginName === "" && this.setState({ valTxtName: "Navn skal være udfyldt" });
    loginPassword < 3 &&
      this.setState({
        valTxtPassword: "Password skal være mindst 3 karakterer"
      });

    if (loginName && loginPassword) {
      this.props.setAuthed(
        true,
        this.state.loginName,
        this.state.loginPassword
      );
      this.setState({ loginName: "", loginPassword: "" });
    }
  };

  handleSubmitCreateAccount = async evt => {
    evt.preventDefault();
    console.log("text: " + this.state.createAccountText)
    // create copy of state?
    const newAccount = {
      name: this.state.createAccountName,
      password: this.state.createAccountPassword,
      age: this.state.createAccountAge,
      text: this.state.createAccountText
    };

    this.props.createAccount(newAccount);
  };

  render() {
    const { authed } = this.props;
    const {
      loginName,
      loginPassword,
      createAccountName,
      createAccountPassword,
      createAccountAge, 
      createAccountText,
      account
    } = this.state;

    return (
      <div className={container()}>
        {authed.isAuthed && (
          <div>
            {console.log(authed)}
            <h1>Profil oplysninger</h1>
            <h2>Navn</h2>
            <p>{account.name && account.name}</p>
            <h2>Alder</h2>
            <p>{account.age && account.age}</p>
            <h2>Profiltekst</h2>
            <p>{account.description && account.description}</p>
            <FormButton
              label="log ud"
              style={{ marginTop: "1rem" }}
              handleSubmit={this.props.handleLogOut}
            />
          </div>
        )}
        {!authed.isAuthed && (
          <>
            <form>
              <h1>Log ind</h1>
              <h2>Brugernavn</h2>
              <TextInput
                name="loginName"
                value={loginName}
                handleChange={this.handleFormChange}
                initText="Brugernavn"
              />

              {this.state.valTxtName && (
                <p className="error-message">
                  <ErrorIcon />
                  {this.state.valTxtName}
                </p>
              )}
              <h2>Kodeord</h2>
              <TextInput
                name="loginPassword"
                value={loginPassword}
                handleChange={this.handleFormChange}
                initText="Kodeord"
              />
              {/* Errormessage */}
              {this.state.valTxtPassword && (
                <p className="error-message">
                  <ErrorIcon /> {this.state.valTxtPassword}
                </p>
              )}
             
              <FormButton
                label="log ind"
                style={{ marginTop: "1rem" }}
                handleSubmit={this.handleSubmitLogin}
              />

              {this.props.errorMessageAuthentication && (
                <p className="error-message">
                  <ErrorIcon />
                  {this.props.errorMessageAuthentication}
                </p>
              )}
            </form>
            {!this.state.createAccount && (
              <div>
                <FormButton
                  label="Lav en ny profil"
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {
                    this.setState({ createAccount: true });
                  }}
                />
              </div>
            )}
            {this.state.createAccount && (
              <form>
                {/*Form validation mangler */}
                <h1>Opret bruger</h1>
                <h2>Navn</h2>
                <TextInput
                  name="createAccountName"
                  value={createAccountName}
                  handleChange={this.handleFormChange}
                  initText="Navn"
                />
                <h2>Password</h2>
                <TextInput
                  name="createAccountPassword"
                  value={createAccountPassword}
                  handleChange={this.handleFormChange}
                  initText="Password"
                />
                <h2>Alder</h2>
                <TextInput
                  name="createAccountAge"
                  value={createAccountAge}
                  handleChange={this.handleFormChange}
                  initText="Alder"
                />
                 <h2>Profiltekst</h2>
                 <TextArea 
                  name="createAccountText" 
                  value={createAccountText} 
                  handleChange={this.handleFormChange} 
                  initText="Profiltext"/>
                <FormButton
                  handleSubmit={this.handleSubmitCreateAccount}
                  label="Send"
                  style={{ marginTop: "1rem" }}
                />
                {this.props.errorMessageCreateAccount && (
                  <p className="error-message">
                    <ErrorIcon />
                    {this.props.errorMessageCreateAccount}
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    );
  }
}

const container = () => css`
  .list {
    margin-top: 1rem;

    .message {
      padding-bottom: 1rem;
    }
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1rem;
  }

  .validation-text {
    padding: 1rem 0 1rem 0;
  }

  form {
    .error-message {
      display: flex;
      align-items: center;

      svg {
        padding-right: 0.5rem;
      }
    }
  }
`;

export default Account;
