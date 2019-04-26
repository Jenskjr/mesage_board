import React, { Component } from "react";
//css
import { css } from "emotion";
import { AccountPlusIcon, AccountEditIcon } from "mdi-react";
// components
import FormButton from "./ui/FormButton";
import EditAccount from "./EditAccount";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Accountinfo from "./AccountInfo";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAccount: JSON.parse(localStorage.getItem("editAccount")) || false
    };
  }

  handleUnsetEdit = () => {
    this.setState({editAccount: false}, () => localStorage.removeItem("editAccount"));
  }

  render() {
    const { account } = this.props;

    return (
      <div className={container()}>
        {/* Logged in */}
        {account.id && (
          <>
            {/* Account info */}
            {!this.state.editAccount &&
              <>
                <Accountinfo account={this.props.account}/>
                <FormButton
                  label="Rediger profil"
                  iconLeft={<AccountEditIcon/>}
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {this.setState({editAccount: true}, () => localStorage.setItem("editAccount", this.state.editAccount)); }}
                />
                <FormButton
                  label="Log ud"
                  iconLeft={<AccountEditIcon/>}
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {this.props.handleLogOut()}}
                />
              </>}
            {/* Edit account */}
            {this.state.editAccount && 
              <EditAccount 
                account={account} 
                unsetEdit={this.handleUnsetEdit} 
                updateAccount={this.props.updateAccount}/>}
          </>
        )}
        {/* Login or create account */}
        {!account.id && (
          <>
            {/* Login */}
            {!this.state.createAccount && <>
              <Login 
                errorMessageAuthentication={this.props.errorMessageAuthentication}
                unsetErrorMessageLogIn={this.props.unsetErrorMessageLogIn}
                handleLogin={this.props.handleLogIn}/>
              <FormButton
                label="Lav en ny profil"
                iconLeft={<AccountPlusIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={() => {
                  this.setState({ createAccount: true });
                }}
              />
            </>}
            {/* Create account */}
            {this.state.createAccount && (
              <>
                <CreateAccount 
                  createAccount={this.props.createAccount} 
                  errorMessageCreateAccount={this.props.errorMessageCreateAccount}
                  unsetErrorMessageCreateAccount={this.props.unsetErrorMessageCreateAccount}/>
              </>
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
