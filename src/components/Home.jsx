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
      profiles: {},
      profile: undefined
    };
  }

  componentDidMount() {
    this.getProfiles();
  }

  async getProfiles() {
    const apiUrl = `http://localhost:5000/api/profiles/`;

    await fetch(apiUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const profiles = data;
        this.setState({ profiles: profiles });
      });
  }

  render() {
    const { profiles } = this.state;

    return (
      <div className={container()}>
        <div>
          {profiles.length > 0 &&
            profiles.map((obj, index) => (
              <div key={index} className="card">
                <div className="card-top">
                  <AccountIcon />
                  <h2>{obj.name}</h2>
                </div>
                <div className="description">{obj.description}</div>
                <Link to={`/profile/:${obj.id}`}>
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
    margin: 1rem;

    .card-top {
      display: flex;
      align-items: center;
      padding: 0 1rem 0 1rem;

      h2,
      svg {
        padding-right: 1rem;
      }
    }

    .description {
      padding: 0 1rem 1rem 1rem;
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
