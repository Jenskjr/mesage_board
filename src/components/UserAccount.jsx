import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//Components
import Button from "./ui/Button";

//css
import { css } from "emotion";

const UserAccount = props => {
  const { userAccount } = props;

  useEffect(() => {
    const urlParams = window.location.href.split("user/:");
    const id = urlParams[1];
    props.getUserAccount(id);
  },[])

  return (
    <div className={container()}>
        <div className="cart">
            <img
              className="image"
              src={process.env.PUBLIC_URL + `/profileImages/${userAccount.image}.jpg`}
              alt=""
            />
            <div>
              <h2>{userAccount.name}</h2>
              <p>{userAccount.age} år</p>
              <p>{userAccount.occupation}</p>
              <p>{userAccount.region}</p>
            </div>
          
        </div>
        <div>
        </div>
        <div className="text">{userAccount.text}</div>
        <Link to={`/`}>
          <Button label="Tilbage" />
        </Link>
      </div> 
  )
} 

const container = () => css`
  .cart {
    display: flex;
    max-width: 1000;

    img {
      width: 40%;
      padding: 1rem;
      border: 1px solid gray;
    }

    div {
      padding: 0 1rem;

      h2 {margin-top: 0;}

      p {
        margin: 0.2rem 0 0.2rem 0;
      }
    }
  }

  .text {
    padding: 1rem 0 2rem 0;
  }

  span {
    font-size: 1rem;
    text-align: top;
  }

  svg {
    padding-right: 1rem;
  }

  a {
    text-decoration: none;
  }
`;

export default UserAccount;
