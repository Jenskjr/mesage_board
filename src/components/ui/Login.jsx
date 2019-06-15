import React, { useState } from "react";
// css
import { AccountIcon, ErrorIcon } from "mdi-react";
// components 
import Warning from "./Warning";
import TextInput from "./TextInput";
import FormButton from "./FormButton";

const Login = props => {
    const [submitted, setSubmitted] = useState(false);

    return <>
       <form>
            <h1>Log ind</h1>
            <h2>Brugernavn</h2>
            <TextInput
                name="loginName"
                value={props.name}
                handleChange={props.handleFormChange}
                initText="Brugernavn"/>
            {!props.name && submitted && <Warning validationText={"Navn mangler at blive udfyldt"}/>}
            <h2>Kodeord</h2>
            <TextInput
                name="loginPassword"
                value={props.password}
                handleChange={props.handleFormChange}
                initText="Kodeord"/>
            {!props.password && submitted && <Warning validationText={"Password mangler at blive udfyldt"}/>}
            <FormButton
                label="log ind"
                iconLeft={<AccountIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={e => {
                    props.handleSubmit(e);
                    setSubmitted(true);
                }}/>
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