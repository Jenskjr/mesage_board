import React, { useState } from "react";
// css
import { AccountIcon, ErrorIcon } from "mdi-react";
// components 
import Warning from "./ui/Warning";
import TextInput from "./ui/TextInput";
import FormButton from "./ui/FormButton";

const Login = props => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [valName, setValName] = useState();
    const [valPassword, setValPassword] = useState();
   
    const handleFormChange = e => {
        e.target.name === "name" && setName(e.target.value);
        e.target.name === "password" && setPassword(e.target.value);
    }

    const handleSubmitLogin = e => {
        e.preventDefault();
        clearAllValidations();
        if (name === undefined || name === "" ) setValName("Navn mangler at blive udfyldt");
        if (password === undefined || password === "" ) setValPassword("Adgagnskode mangler at blive udfyldt");
    
        if (name && password) {
            console.log("Login");
            props.handleLogin(true, name, password);
            setName(undefined);
            setPassword(undefined);
            };
        }

    const clearAllValidations = () => {
        setValName();
        setValPassword();
    }

    return <>
       <form>
            <h1>Log ind</h1>
            <h2>Brugernavn</h2>
            <TextInput
            name="name"
            value={name}
            handleChange={handleFormChange}
            initText="Brugernavn"
            />
            <Warning validationText={valName}/>              
            <h2>Kodeord</h2>
            <TextInput
            name="password"
            value={password}
            handleChange={handleFormChange}
            initText="Kodeord"
            />
            <Warning validationText={valPassword}/>
            <FormButton
            label="log ind"
            iconLeft={<AccountIcon/>}
            style={{ marginTop: "1rem" }}
            handleSubmit={handleSubmitLogin}
            />

            {props.errorMessageAuthentication && (
            <p className="error-message">
                <ErrorIcon />
                {props.errorMessageAuthentication}
                {props.unsetErrorMessageLogIn()}
            </p>
            )}
        </form>
    </> 
}

export default Login;