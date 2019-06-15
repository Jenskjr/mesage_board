import React, { useState, useEffect } from "react";
// css
import { CancelIcon, SendIcon } from "mdi-react";
// components 
import Warning from "./Warning";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import FormButton from "./FormButton";

const EditAccount = props => {

    const [submitted, setSubmitted] = useState(false);

    // component did mount
    useEffect (() => { 
       props.setInitFormData && props.setInitFormData(props.account)
       
    },[])

    return <>
    <h1>Rediger brugeroplysninger</h1>
    <h2>Brugernavn</h2>

    <TextInput
      name="name"
      value={props.name}
      handleChange={props.handleFormChange}
    />
    {!props.name && submitted && <Warning validationText={"Navn mangler at blive udfyldt"}/>}
    <h2>Kodeord</h2>
    <TextInput
      name="password"
      value={props.password}
      handleChange={props.handleFormChange}
    />
    {!props.password && submitted && <Warning validationText={"Adgagnskode mangler at blive udfyldt"}/>}
    <h2>Alder</h2>
    <TextInput
      name="age"
      value={props.age}
      handleChange={props.handleFormChange}
    />
    {!props.age && submitted && <Warning validationText={"Alder mangler at blive udfyldt"}/>}
    <h2>Beskæftigelse</h2>
    <TextInput
      name="occupation"
      value={props.occupation}
      handleChange={props.handleFormChange}
    />
    {!props.occupation && submitted && <Warning validationText={"Beskæftigelse mangler at blive udfyldt"}/>}
    <h2>Region</h2>
    <TextInput
      name="region"
      value={props.region}
      handleChange={props.handleFormChange}
    />
    {!props.region && submitted && <Warning validationText={"Region mangler at blive udfyldt"}/>}             
    <h2>Profiltekst</h2>
    <TextArea 
      rows={20}
      name="text" 
      value={props.text}
      handleChange={props.handleFormChange} 
    />
    {!props.text && submitted && <Warning validationText={"Profiltekst mangler at blive udfyldt"}/>}
    <FormButton
      label="Gem"
      iconLeft={<SendIcon/>}
      style={{ marginTop: "1rem" }}
      handleSubmit={e => { 
        props.handleSubmit(e);
        setSubmitted(true) }}
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