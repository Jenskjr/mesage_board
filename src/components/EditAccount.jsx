import React, { useState, useEffect } from "react";
// css
import { CancelIcon, SendIcon } from "mdi-react";
// components 
import Warning from "./ui/Warning";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";

const EditAccount = props => {
    const {account} = props;

    const [valName, setValName] = useState();
    const [valPassword, setValPassword] = useState();
    const [valAge, setValAge] = useState();
    const [valOccupation, setValOccupation] = useState();
    const [valRegion, setValRegion] = useState();
    const [valText, setValText] = useState();

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState();
    const [occupation, setOccupation] = useState();
    const [region, setRegion] = useState();
    const [text, setText] = useState();

    // component did mount
    useEffect (() => {
       setInitalValues();
    },[])
    
    const setInitalValues = () => {
        setName(account.name);
        setPassword(account.password);
        setAge(account.age);
        setOccupation(account.occupation);
        setRegion(account.region);
        setText(account.text);
    } 

    const handleFormChange = (e) => {
        e.target.name === "name" && setName(e.target.value);
        e.target.name === "password" && setPassword(e.target.value);
        e.target.name === "age" && setAge(e.target.value);
        e.target.name === "occupation" && setOccupation(e.target.value);
        e.target.name === "region" && setRegion(e.target.value);
        e.target.name === "text" && setText(e.target.value);
    }

    const handleUpdateAccount = () => {

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
            console.log("Update account") 
            const updatedAccount = {
                id: props.account.id,
                name: name,
                password: password,
                age: age,
                occupation: occupation,
                region: region,
                text: text
              };
              props.updateAccount(updatedAccount);
              props.unsetEdit();
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
    <h1>Rediger brugeroplysninger</h1>
    <h2>Brugernavn</h2>
    <TextInput
      name="name"
      defaultValue={account.name}
      handleChange={handleFormChange}
    />
    <Warning validationText={valName}/>
    <h2>Kodeord</h2>
    <TextInput
      name="password"
      dafaultValue={account.password}
      handleChange={handleFormChange}
    />
    <Warning validationText={valPassword}/>
    <h2>Alder</h2>
    <TextInput
      name="age"
      defaultValue={account.age}
      handleChange={handleFormChange}
    />
    <Warning validationText={valAge}/>
    <h2>Beskæftigelse</h2>
    <TextInput
      name="occupation"
      defaultValue={account.occupation}
      handleChange={handleFormChange}
    />
    <Warning validationText={valOccupation}/>
    <h2>Region</h2>
    <TextInput
      name="region"
      defaultValue={account.region}
      handleChange={handleFormChange}
    />
    <Warning validationText={valRegion}/>              
    <h2>Profiltekst</h2>
    <TextArea 
      rows={20}
      name="text" 
      defaultValue={account.text}
      handleChange={handleFormChange} 
    />
    <Warning validationText={valText}/>
    <FormButton
      label="Gem"
      iconLeft={<SendIcon/>}
      style={{ marginTop: "1rem" }}
      handleSubmit={handleUpdateAccount}
    />
    <FormButton
      label="Annuller"
      iconLeft={<CancelIcon/>}
      style={{ marginTop: "1rem" }}
      handleSubmit={props.unsetEdit}
    />
  </> 
}

export default EditAccount;