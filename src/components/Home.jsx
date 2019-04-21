import React, { useEffect } from "react";

import { css } from "emotion";
import { Link } from "react-router-dom";
import { AccountIcon } from "mdi-react";
// Components
import FormButton from "./ui/FormButton";

const Frontpage = props => {
  const { accounts } = props;
  //  useEffect(() => {
  //   console.log("Component did mount")
  // }, []);

  return (
    <div className={container()}>
        <div>
          {accounts.length > 0 &&
            accounts.map((obj, index) => (
              <div key={index} className="card">
                <div className="card-top">
                  <AccountIcon />
                  <h2>{obj.name}</h2>
                </div>
                <div className="text">{obj.text}</div>
                {/* account */}
                <Link to={`/user/:${obj.id}`}>
                  <FormButton
                    label="Se min profil"
                    iconLeft={<AccountIcon />}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
  )
}

const container = () => css`
  .card {


    .card-top {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      border-bottom: 1px solid #4877E5;

      h2,
      svg {
        padding-right: 1rem;
      }
    }

    .text {
      padding: 1rem 0 2rem 0;
    }

    img {
      padding: 0.5rem 0 0.5rem 0;
      width: 100%;
      max-width: 1000px;
    }

    a {
      text-decoration: none;
    }
  }
`;

export default Frontpage;
