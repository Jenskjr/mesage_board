import React, { Component } from "react";
//css
import { css } from "emotion";
import { AccountPlusIcon, AccountEditIcon } from "mdi-react";
// components
import FormButton from "./ui/FormButton";
import EditAccount from "./ui/EditAccount";
import Login from "./ui/Login";
import Accountinfo from "./AccountInfo";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAccount: JSON.parse(localStorage.getItem("editAccount")) || false,
      createAccount: JSON.parse(localStorage.getItem("createAccount")) || false,
      formData: {
        loginName: undefined, 
        loginPassword: undefined
      }
    };
  }
  
  setEdit = () => {
    this.setState({editAccount: true}, () => localStorage.setItem("editAccount", this.state.editAccount));
  }
  
  unsetEdit = () => {
    this.setState({editAccount: false, formData: []}, () => localStorage.removeItem("editAccount"));
  }


  setCreate = () => {
    this.setState({createAccount: true}, () => localStorage.setItem("createAccount", this.state.createAccount));
  }

  unsetCreate = () => {
    this.setState({createAccount: false, formData: []}, () => localStorage.removeItem("createAccount"));
  }

  // This is because of render prosp
  setInitFormData = (account) => {
    this.setState({
      formData: {
        name: account.name,
        age: account.age,
        occupation: account.occupation,
        region: account.region,
        text: account.text 
      }
    })
  }

  handleFormChange = e => {
    this.setState({formData: {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }}, () => {
      this.validateLoginForm();
      this.validateEditForm();
      this.validateCreateForm();
    })
  }
  validateLoginForm = () => {
    let { loginName, loginPassword } = this.state.formData
    loginName && loginPassword ? this.setState({validLogin: true}): this.setState({validLogin: false})
  }

  validateEditForm = () => {
    let {name, password, age, occupation, region, text } = this.state.formData
    name && password && age && occupation && region && text ? this.setState({validEdit: true}): this.setState({validEdit: false})
  }

  validateCreateForm = () => {
    let {name, password, age, occupation, region, text } = this.state.formData
    name && password && age && occupation && region && text ? this.setState({validCreate: true}): this.setState({validCreate: false})
  }

  handleSubmitLogin = e => {
    let { loginName, loginPassword } = this.state.formData
    let { validLogin } = this.state
    validLogin && this.props.handleLogin(validLogin, loginName, loginPassword)
    this.unsetEdit();
  }

  handleSubmitEdit = e => {
    let { name, password, age, occupation, region, text } = this.state.formData
    let { account } = this.props
    let { validEdit } = this.state
    account = {
      id: account.id,
      name: name,
      password: password,
      age: age,
      occupation: occupation,
      region: region,
      text: text
    }
 
    if (validEdit) {
      this.props.updateAccount(account);
      this.unsetEdit();
    } 
  }

  handleSubmitCreate = e => {
    let { name, password, age, occupation, region, text } = this.state.formData;
    let { account } = this.props;
    let { validCreate } = this.state;

    account = {
      name: name,
      password: password,
      age: age,
      occupation: occupation,
      region: region,
      text: text
    };

    if (validCreate) {
      this.props.createAccount(account);
      this.unsetCreate();
    } 
   }


  render() {
    let { loginName, loginPassword, name, password, age, occupation, region, text} = this.state.formData;
    let { account } = this.props;

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
                  handleSubmit={() => {   
                    this.setEdit();
                    this.unsetCreate();
                  }}
                />
                <FormButton
                  label="Log ud"
                  iconLeft={<AccountEditIcon/>}
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {
                    this.props.handleLogOut();
                    this.unsetEdit();
                    this.unsetCreate();
                  }}
                />
              </>}
            {/* Edit account */}
            {this.state.editAccount && 
              <EditAccount 
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmitEdit}
                setInitFormData={this.setInitFormData}
                name={name}
                password={password}
                age={age}
                occupation={occupation}
                region={region}
                text={text}
                account={account} 
                unsetEdit={this.unsetEdit}
                />}
          </>
        )}
        {/* Login or create account */}
        {!account.id && (
          <>
            {/* Login */}
            {!this.state.createAccount && <>
              <Login 
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmitLogin} 
                name={loginName}
                password={loginPassword}
                errorMessageAuthentication={this.props.errorMessageAuthentication}
                unsetErrorMessageLogIn={this.props.unsetErrorMessageLogIn}
              />
              <FormButton
                label="Lav en ny profil"
                iconLeft={<AccountPlusIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={() => {
                  this.setState({formData: []})
                  this.setCreate();
                  this.unsetEdit();
                }}
              />
            </>}
            {/* Create account */}
            {this.state.createAccount && (
              <>
                <EditAccount 
                  handleFormChange={this.handleFormChange}
                  handleSubmit={this.handleSubmitCreate}
                  name={name}
                  password={password}
                  age={age}
                  occupation={occupation}
                  region={region}
                  text={text}
                  unsetEdit={this.unsetCreate} 
                />
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

  /* .validation-text {
    padding: 1rem 0 1rem 0;
  } */

  /* form {
    .error-message {
      display: flex;
      align-items: center;

      svg {
        padding-right: 0.5rem;
      }
    }
  } */
`;

export default Account;
