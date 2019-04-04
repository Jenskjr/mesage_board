import React, { Component } from "react";
import { Link } from "react-router-dom";
//Components
import FormButton from "./ui/FormButton";

//css
import { css } from "emotion";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    const urlParams = window.location.href.split("profile/:");
    const id = urlParams[1];
    const apiUrl = `http://localhost:5000/api/profiles/${id}`;

    await fetch(apiUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const profile = data;
        this.setState({ profile: profile });
      });
  }

  render() {
    const { profile } = this.state;

    return (
      <div className={container()}>
        <div className="cart">
          <h2>{profile.name}</h2>
          <h2>{profile.age} år</h2>
        </div>
        <div>
          <img
            className="image"
            src={process.env.PUBLIC_URL + `/profileImages/${profile.image}.jpg`}
          />
        </div>
        <div>{profile.description}</div>
        <Link to={`/`}>
          <FormButton label="Tilbage" />
        </Link>
      </div>
    );
  }
}

const container = () => css`
  .cart {
    display: flex;
    justify-content: space-between;
    max-width: 1000;
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

export default Profile;
