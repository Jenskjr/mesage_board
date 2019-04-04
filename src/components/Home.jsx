import React, { Component } from "react";

import { css } from "emotion";
import { Link } from "react-router-dom";
import { AccountIcon } from "mdi-react";
// Components
import FormButton from "./ui/FormButton";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profiles: {},
      // profile: undefined
    };
  }

  componentDidMount() {
    this.props.getAccounts();
  }

  render() {
    const { accounts } = this.props;

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
                <div className="description">{obj.description}</div>
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
    );
  }
}

const container = () => css`
  .card {


    .card-top {
      display: flex;
      align-items: center;

      h2,
      svg {
        padding-right: 1rem;
      }
    }

    .description {
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

export default Home;
