import React, { useState, Component } from "react";
import TextInput from "./ui/TextInput";
import FormButton from "./ui/FormButton";

//css
import { css } from "emotion";
import { ErrorIcon } from "mdi-react";
import TextArea from "./ui/TextArea";


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",
      createAccount: false,
      editProfile: false,
      createAccountName: "",
      createAccountPassword: "",
      createAccountAge: "", 
      createAccountText: "",
    };
  }

  handleFormChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmitLogin = evt => {
    evt.preventDefault();
    const { loginName, loginPassword } = this.state;

    // vaidation
    this.setState({ valTxtPassword: "", valTxtName: "" });
    loginName === "" && this.setState({ valTxtName: "Navn skal være udfyldt" });
    loginPassword < 3 &&
      this.setState({
        valTxtPassword: "Password skal være mindst 3 karakterer"
      });

    if (loginName && loginPassword) {
      
      this.props.handleLogIn(true, loginName, loginPassword)
      // this.props.getAccount(2); // 
      this.setState({ loginName: "", loginPassword: "" });
    }
  };

  handleSubmitCreateAccount = async evt => {
    evt.preventDefault();
    const { createAccountName, createAccountPassword, createAccountAge, createAccountText } = this.state;

    // validation
    this.setState({valTxtCreateName: "", valTxtCreatePaseword: "", valTxtCreateAge: "", valTxtCreateText: ""});
    createAccountName === "" && this.setState({valTxtCreateName: "Navn mangler at blive udfyldt"})
    createAccountPassword === "" && this.setState({valTxtCreatePassword: "Adgagnskode mangler at blive udfyldt"})
    createAccountAge === "" && this.setState({valTxtCreateAge: "Alder mangler at blive udfyldt"})
    createAccountText === "" && this.setState({valTxtCreateText: "Profiltext mangler at blive udfyldt"})

    if (createAccountName && createAccountPassword && createAccountAge && createAccountText) {
          // create copy of state?
          const newAccount = {
            name: this.state.createAccountName,
            password: this.state.createAccountPassword,
            age: this.state.createAccountAge,
            text: this.state.createAccountText
          };
          this.props.createAccount(newAccount);
    }
  };

  showErrorMessage = validationText => {
      return (
       <> 
      <p className="error-message">
        <ErrorIcon />
        {validationText}
      </p>
      {setTimeout(() => {this.setState({"valTxtName": ""})}, 10000)}
      </>)
  }

  handleSaveProfile = () => {
    console.log("Save profile")
  }

  render() {
    const { account } = this.props;
    const {
      loginName,
      loginPassword,
      createAccountName,
      createAccountPassword,
      createAccountAge, 
      createAccountText,
    } = this.state;

    return (
      <div className={container()}>
        {account.id && (
          <div>
            {!this.state.editProfile &&
              <>
                <h1>Profil oplysninger</h1>
                <h2>Navn</h2>
                <p>{account.name && account.name}</p>
                <h2>Alder</h2>
                <p>{account.age && account.age}</p>
                <h2>Profiltekst</h2>
                <p className="desciption">{account.description && account.description}</p>
                <FormButton
                  label="Rediger profil"
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {this.setState({editProfile: !this.state.editProfile})}}
                />
              </>}
              {this.state.editProfile && 
              <div>
                Rediger profil 
                <FormButton
                  label="Gem"
                  style={{ marginTop: "1rem" }}
                  handleSubmit={this.handleSaveProfile}
                />
                <FormButton
                  label="Annuller"
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {this.setState({editProfile: !this.state.editProfile})}}
                />
              </div>}

            
          </div>
        )}
        {!account.id && (
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
                this.showErrorMessage(this.state.valTxtName)
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
                  {this.props.unsetErrorMessageLogIn()}
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
                {this.state.valTxtCreateName && (
                  <p className="error-message">
                    <ErrorIcon />
                    {this.state.valTxtCreateName}
                  </p>
                )}
                <h2>Password</h2>
                <TextInput
                  name="createAccountPassword"
                  value={createAccountPassword}
                  handleChange={this.handleFormChange}
                  initText="Password"
                />
                 {this.state.valTxtCreatePassword && (
                  <p className="error-message">
                    <ErrorIcon />
                    {this.state.valTxtCreatePassword}
                  </p>
                )}
                <h2>Alder</h2>
                <TextInput
                  name="createAccountAge"
                  value={createAccountAge}
                  handleChange={this.handleFormChange}
                  initText="Alder"
                />
                 {this.state.valTxtCreateAge && (
                  <p className="error-message">
                    <ErrorIcon />
                    {this.state.valTxtCreateAge}
                  </p>
                )}
                 <h2>Profiltekst</h2>
                 <TextArea 
                  name="createAccountText" 
                  value={createAccountText} 
                  handleChange={this.handleFormChange} 
                  initText="Profiltext"/>
                  {this.state.valTxtCreateText && (
                    <p className="error-message">
                      <ErrorIcon />
                      {this.state.valTxtCreateText}
                    </p>
                  )}
                <FormButton
                  handleSubmit={this.handleSubmitCreateAccount}
                  label="Send"
                  style={{ marginTop: "1rem" }}
                />
                {this.props.errorMessageCreateAccount && (
                  <p className="error-message">
                    <ErrorIcon />
                    {this.props.errorMessageCreateAccount} 
                    {this.props.unsetErrorMessageCreateAccount()}
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
