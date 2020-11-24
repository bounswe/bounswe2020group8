import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
export default class LogoutButton extends Component {
  state = { isSignedIn: undefined };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1005866627235-accsl31ht1m9lh95nufh4dejqb2vq774.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async (isSignedIn) => {
    this.setState({ isSignedIn });
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  render() {
    return this.state.isSignedIn ? (
      <div style={{ marginTop: 15 }} onClick={this.onSignOutClick}>
        {" "}
        <FontAwesomeIcon
          icon={faPowerOff}
          style={{
            height: 20,
            width: 25,
            marginRight: 10,
            color: "#ea4335",
          }}
        />
        <div style={{ font: 10 }}>Sign out</div>
      </div>
    ) : null;
  }
}
