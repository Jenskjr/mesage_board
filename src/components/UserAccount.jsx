import React, { Component } from "react";
import { Link } from "react-router-dom";
//Components
import FormButton from "./ui/FormButton";

//css
import { css } from "emotion";

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    const urlParams = window.location.href.split("user/:");
    const id = urlParams[1];
    this.props.getUserAccount(id);
  }

  render() {
    const { profile } = this.state;
    const { userAccount } = this.props;

    return (
      <div className={container()}>
        <div className="cart">
          <h2>{userAccount.name}</h2>
          <h2>{userAccount.age} år</h2>
        </div>
        <div>
          <img
            className="image"
            src={process.env.PUBLIC_URL + `/profileImages/${userAccount.image}.jpg`}
          />
        </div>
        <div className="description">{userAccount.description}</div>
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

  .description {
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
