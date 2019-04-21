import React, { Component } from "react";
//css
import { css } from "emotion";
import { ErrorIcon, CancelIcon, SendIcon, AccountIcon, AccountPlusIcon, AccountEditIcon } from "mdi-react";
// components
import TextInput from "./ui/TextInput";
import FormButton from "./ui/FormButton";
import TextArea from "./ui/TextArea";
import Warning from "./ui/Warning";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAccount: JSON.parse(localStorage.getItem("editAccount")) || false,
      loginName: "",
      loginPassword: "",
      createAccount: false,
      createAccountName: "",
      createAccountPassword: "",
      createAccountAge: "", 
      createAccountText: "",
      createAccountOccupation: "",
      createAccountRegion: ""
    };
  }

  componentWillReceiveProps () {
    this.setInitionalFormValues();
  }

  componentDidMount () {
    this.setInitionalFormValues();
  }

  setInitionalFormValues = () => {
    this.setState({editAccountName: this.props.account.name});
    this.setState({editAccountPassword: this.props.account.password});
    this.setState({editAccountAge: this.props.account.age});
    this.setState({editAccountOccupation: this.props.account.occupation});
    this.setState({editAccountRegion: this.props.account.region});
    this.setState({editAccountText: this.props.account.text});
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
      this.setState({ loginName: "", loginPassword: "" });
    }
  };

  handleUpdateAccount = e => {
    e.preventDefault();
    
    const { 
      editAccountName, 
      editAccountPassword, 
      editAccountAge, 
      editAccountOccupation,
      editAccountRegion,
      editAccountText
    } = this.state;

    this.clearAllErrorMessages();

    // De skal laves en funktion hver for sig 
    if (editAccountName === undefined || editAccountName === "") this.setState({valTxtName: "Navn mangler at blive udfyldt"})
    if (editAccountPassword === undefined || editAccountPassword === "") this.setState({valTxtPassword: "Adgagnskode mangler at blive udfyldt"})
    if (editAccountAge === undefined || editAccountAge === "") this.setState({valTxtAge: "Alder mangler at blive udfyldt"})
    if (editAccountOccupation === undefined || editAccountOccupation === "") this.setState({valTxtOccupation: "Beskæftigelse mangler at blive udfyldt"});
    if (editAccountRegion === undefined || editAccountRegion === "") this.setState({valTxtRegion: "Region mangler at blive udfyldt"})
    if (editAccountText === undefined || editAccountText === "") this.setState({valTxtText: "Profiltekst mangler at blive udfyldt"})
  
    if (
      editAccountName && 
      editAccountPassword && 
      editAccountAge && 
      editAccountOccupation && 
      editAccountRegion && 
      editAccountText
    ) {
      const updatedAccount = {
        id: this.props.account.id,
        name: editAccountName,
        password: editAccountPassword,
        age: editAccountAge,
        occupation: editAccountOccupation,
        region: editAccountRegion,
        text: editAccountText
      };
      this.props.updateAccount(updatedAccount);
      localStorage.removeItem("editAccount");
      this.setState({editAccount: false});
    }
  }

  handleSubmitAccount = e => {
    e.preventDefault();
    const { 
      createAccountName, 
      createAccountPassword, 
      createAccountAge, 
      createAccountText,
      createAccountOccupation,
      createAccountRegion
    } = this.state;

    // validation
    this.clearAllErrorMessages();
    // De skal laves en funktion hver for sig 
    if (createAccountName === undefined || createAccountName === "" ) this.setState({valTxtName: "Navn mangler at blive udfyldt"})
    if (createAccountPassword === undefined || createAccountPassword === "" ) this.setState({valTxtPassword: "Adgagnskode mangler at blive udfyldt"})
    if (createAccountAge === undefined || createAccountAge === "" ) this.setState({valTxtAge: "Alder mangler at blive udfyldt"})
    if (createAccountOccupation === undefined || createAccountOccupation === "" ) this.setState({valTxtOccupation: "Beskæftigelse mangler at blive udfyldt"});
    if (createAccountRegion === undefined ||  createAccountRegion === "" ) this.setState({valTxtRegion: "Region mangler at blive udfyldt"})
    if (createAccountText === undefined || createAccountText === "" ) this.setState({valTxtText: "Profiltekst mangler at blive udfyldt"})

    // create account
 
    if (
      createAccountName && 
      createAccountPassword && 
      createAccountAge &&  
      createAccountOccupation && 
      createAccountRegion && 
      createAccountText) {
          const newAccount = {
            name: createAccountName,
            password: createAccountPassword,
            age: createAccountAge,
            occupation: createAccountOccupation,
            region: createAccountRegion,
            text: createAccountText
          };
          this.props.createAccount(newAccount);
    }
  };

  clearAllErrorMessages = () => {
    this.setState({
      valTxtName: "", 
      valTxtPassword: "", 
      valTxtAge: "", 
      valTxtOccupation: "",
      valTxtRegion: "",
      valTxtText: ""
    });
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
      createAccountOccupation,
      createAccountRegion, 
      createAccountText,
      valTxtName,
      valTxtPassword,
      valTxtAge,
      valTxtOccupation,
      valTxtRegion,
      valTxtText

    } = this.state;

    return (
      <div className={container()}>
        {account.id && (
          <div>
            {/* Account info */}
            {!this.state.editAccount &&
              <>
                <h1>Profil oplysninger</h1>
                <h2>Navn</h2>
                <p>{account.name && account.name}</p>
                <h2>Alder</h2>
                <p>{account.age && account.age}</p>
                <h2>Beskæftigelse</h2>
                <p>{account.occupation && account.occupation}</p>
                <h2>Region</h2>
                <p>{account.region && account.region}</p>
                <h2>Profiltekst</h2>
                <p className="desciption">{account.text && account.text}</p>
                <FormButton
                  label="Rediger profil"
                  iconLeft={<AccountEditIcon/>}
                  style={{ marginTop: "1rem" }}
                  handleSubmit={() => {this.setState({editAccount: true}, () => localStorage.setItem("editAccount", this.state.editAccount)); this.clearAllErrorMessages() }}
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
              <>
              <h1>Rediger brugeroplysninger</h1>
              <h2>Brugernavn</h2>
              <TextInput
                name="editAccountName"
                defaultValue={account.name}
                handleChange={this.handleFormChange}
              />
              <Warning validationText={valTxtName}/>
              <h2>Kodeord</h2>
              <TextInput
                name="editAccountPassword"
                dafaultValue={account.password}
                handleLoad={this.handleFormLoad}
                handleChange={this.handleFormChange}
              />
              <Warning validationText={valTxtPassword}/>
              <h2>Alder</h2>
              <TextInput
                name="editAccountAge"
                defaultValue={account.age}
                handleChange={this.handleFormChange}
              />
              <Warning validationText={valTxtAge}/>
              <h2>Beskæftigelse</h2>
              <TextInput
                name="editAccountOccupation"
                defaultValue={account.occupation}
                handleChange={this.handleFormChange}
              />
              <Warning validationText={valTxtOccupation}/>
              <h2>Region</h2>
              <TextInput
                name="editAccountRegion"
                defaultValue={account.region}
                handleChange={this.handleFormChange}
              />
              <Warning validationText={valTxtRegion}/>              
              <h2>Profiltekst</h2>
              <TextArea 
                rows={20}
                name="editAccountText" 
                defaultValue={account.text}
                handleChange={this.handleFormChange} 
              />
              <Warning validationText={valTxtText}/>
              <FormButton
                label="Gem"
                iconLeft={<SendIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={this.handleUpdateAccount}
              />
              <FormButton
                label="Annuller"
                iconLeft={<CancelIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={() => {this.setState({editAccount: false}, () => localStorage.removeItem("editAccount"));this.clearAllErrorMessages()}}
              />
            </>}
          </div>
        )}
        {/* Login or create account */}
        {!account.id && (
          <>
            {!this.state.createAccount && <>
            <form>
              <h1>Log ind</h1>
              <h2>Brugernavn</h2>
              <TextInput
                name="loginName"
                value={loginName}
                handleChange={this.handleFormChange}
                initText="Brugernavn"
              />
              <Warning validationText={valTxtName}/>              
              <h2>Kodeord</h2>
              <TextInput
                name="loginPassword"
                value={loginPassword}
                handleChange={this.handleFormChange}
                initText="Kodeord"
              />
              <Warning validationText={valTxtPassword}/>
              <FormButton
                label="log ind"
                iconLeft={<AccountIcon/>}
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
            <div>
              <FormButton
                label="Lav en ny profil"
                iconLeft={<AccountPlusIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={() => {
                  this.clearAllErrorMessages();
                  this.setState({ createAccount: true });
                }}
              />
            </div>
            </>}
            {/* Create account */}
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
                <Warning validationText={valTxtName}/> 
                <h2>Password</h2>
                <TextInput
                  name="createAccountPassword"
                  value={createAccountPassword}
                  handleChange={this.handleFormChange}
                  initText="Kodeord"
                />
                <Warning validationText={valTxtPassword}/>
                <h2>Alder</h2>
                <TextInput
                  name="createAccountAge"
                  value={createAccountAge}
                  handleChange={this.handleFormChange}
                  initText="Alder"
                />
                <Warning validationText={valTxtAge}/>
                <h2>Beskæftigelse</h2>
                <TextInput 
                  name="createAccountOccupation" 
                  value={createAccountOccupation} 
                  handleChange={this.handleFormChange} 
                  initText="Beskæftigelse"/>
                <Warning validationText={valTxtOccupation}/>
                <h2>Region</h2>
                <TextInput 
                  name="createAccountRegion" 
                  value={createAccountRegion} 
                  handleChange={this.handleFormChange} 
                  initText="Region"/>
                <Warning validationText={valTxtRegion}/>
                <h2>Profiltekst</h2>
                <TextArea 
                  name="createAccountText" 
                  value={createAccountText} 
                  handleChange={this.handleFormChange} 
                  initText="Profiltekst"/>
                <Warning validationText={valTxtText}/>  
                <FormButton
                  handleSubmit={this.handleSubmitAccount}
                  label="Send"
                  iconLeft={<SendIcon/>}
                  style={{ marginTop: "1rem" }}
                />
                <FormButton
                  handleSubmit={e => {e.preventDefault(); this.clearAllErrorMessages(); this.setState({createAccount: false})}}
                  label="Fortryd"
                  iconLeft={<CancelIcon/>}
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
