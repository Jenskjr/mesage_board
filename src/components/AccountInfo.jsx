import React, { useState } from "react";
// css
import { css } from "emotion";
import { AccountIcon, ErrorIcon } from "mdi-react";
// components 
import Warning from "./ui/Warning";
import TextInput from "./ui/TextInput";
import FormButton from "./ui/FormButton";

const AccountInfo = props => {
    const { account } = props;

    return (
        <div className={container()}>
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
            <p>{account.text && account.text}</p>
        </div>
    )        
}

const container = () => css``;

export default AccountInfo;