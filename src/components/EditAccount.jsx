import React, { useState } from "react";

// components 
import Warning from "./ui/Warning";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import FormButton from "./ui/FormButton";

const EditAccount = props => {
    
    useEffect (() => {
        console.log("component did mount")
    },[])
    
    return <>Edit Account</> 
}

export default EditAccount;