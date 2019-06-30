import React, { useState, useEffect } from "react";
// css
import { CancelIcon, SendIcon, ErrorIcon } from "mdi-react";
// components 
import Warning from "./ui/Warning";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";

const CreateAccount = props => {
    const [createAccount, setCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("");
    const [text, setText] = useState("");
    const [occupation, setOccupation] = useState("");
    const [region, setRegion] = useState("");
    
    const [valName, setValName] = useState();
    const [valPassword, setValPassword] = useState();
    const [valAge, setValAge] = useState();
    const [valOccupation, setValOccupation] = useState();
    const [valRegion, setValRegion] = useState();
    const [valText, setValText] = useState();

    const handleFormChange = e => {
        e.target.name === "name" && setName(e.target.value);
        e.target.name === "password" && setPassword(e.target.value);
        e.target.name === "age" && setAge(e.target.value);
        e.target.name === "occupation" && setOccupation(e.target.value);
        e.target.name === "region" && setRegion(e.target.value);
        e.target.name === "text" && setText(e.target.value);
    }

    const handleCreateAccount = e => {
        e.preventDefault();
        clearAllValidations();
        if (name === undefined || name === "" ) setValName("Navn mangler at blive udfyldt");
        if (password === undefined || password === "" ) setValPassword("Adgagnskode mangler at blive udfyldt");
        if (age === undefined || age === "" ) setValAge("Alder mangler at blive udfyldt");
        if (occupation === undefined || occupation === "" ) setValOccupation("Beskæftigelse mangler at blive udfyldt");
        if (region === undefined || region === "" ) setValRegion("Region mangler at blive udfyldt");
        if (text === undefined || text === "" ) setValText("Profiltekst mangler at blive udfyldt");

        if (
            name &&
            password && 
            age && 
            occupation && 
            region &&
            text
        ) {
            const createdAccount = {
                name: name,
                password: password,
                age: age,
                occupation: occupation,
                region: region,
                text: text
            };
            props.createAccount(createdAccount);
        }
    }

    const clearAllValidations = () => {
        setValName();
        setValPassword();
        setValAge();
        setValOccupation();
        setValRegion();
        setValText();
    }

    return <>
        <form>
            <h1>Opret bruger</h1>
            <h2>Navn</h2>
            <TextInput
                name="name"
                value={name}
                handleChange={handleFormChange}
                initText="Navn"
            />
            <Warning validationText={valName}/> 
            <h2>Password</h2>
            <TextInput
                name="password"
                value={password}
                handleChange={handleFormChange}
                initText="Kodeord"
            />
            <Warning validationText={valPassword}/>
            <h2>Alder</h2>
            <TextInput
                name="age"
                value={age}
                handleChange={handleFormChange}
                initText="Alder"
            />
            <Warning validationText={valAge}/>
            <h2>Beskæftigelse</h2>
            <TextInput 
                name="occupation" 
                value={occupation} 
                handleChange={handleFormChange} 
                initText="Beskæftigelse"/>
            <Warning validationText={valOccupation}/>
            <h2>Region</h2>
            <TextInput 
                name="region" 
                value={region} 
                handleChange={handleFormChange} 
                initText="Region"/>
            <Warning validationText={valRegion}/>
            <h2>Profiltekst</h2>
            <TextArea 
                name="text" 
                value={text} 
                handleChange={handleFormChange} 
                initText="Profiltekst"/>
            <Warning validationText={valText}/>  
            <FormButton
                handleSubmit={handleCreateAccount}
                label="Send"
                iconLeft={<SendIcon/>}
                style={{ marginTop: "1rem" }}
            />
            <FormButton
                label="Fortryd"
                iconLeft={<CancelIcon/>}
                style={{ marginTop: "1rem" }}
                handleSubmit={props.unsetEdit}
            />
            {props.errorMessageCreateAccount && (
            <p className="error-message">
                <ErrorIcon />
                {props.errorMessageCreateAccount} 
                {props.unsetErrorMessageCreateAccount()}
            </p>
            )}
        </form>
    </> 
}

export default CreateAccount;