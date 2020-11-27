import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, signOut } from "../redux/auth/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { POST } from "../apis/services";

import classes from "../components/Login/Login.module.css";

class GoogleAuth extends Component {
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
    if (isSignedIn) {
      this.props.signIn();
      const currentUserProfile = this.auth.currentUser.get().getBasicProfile();
      const query = {
        email: currentUserProfile.getEmail(),
        googleID: currentUserProfile.NT,
        type:
          this.props.userType?.toUpperCase() === "VENDOR" ? "VENDOR" : "CLIENT",
      };

      const url = `/client/${
        this.props.isSignup ? "signup" : "login"
      }WithGoogle`;

      const response = await POST(url, {}, query);
      this.props.history.push("/");
    } else {
      this.props.signOut();
      this.auth.signOut();
    }
  };

  componentWillUnmount() {
    this.onAuthChange = undefined;
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderSignOut() {
    return (
      <div
        //style={{
        //  flex: 1,
        //  flexDirection: "row",
        //  justifyContent: "space-between",
        //}}
        className={classes.GoogleLogin}
      >
        <button
          onClick={this.onSignOutClick}
          className={classes.GoogleLoginButton}
          //style={{
          //  height: 40,
          //  width: 200,
          //  borderRadius: 5,
          //  backgroundColor: "white",
          //  alignItems: "center",
          //  justifyContent: "center",
          //  display: "flex",
          //}}
        >
          <b> Sign out</b>
        </button>
      </div>
    );
  }

  renderSignIn() {
    return (
      <div
        className={classes.GoogleLogin}
        //style={{
        //  flex: 1,
        //  flexDirection: "row",
        //  justifyContent: "space-between",
        //}}
      >
        <button
          onClick={this.onSignInClick}
          className={classes.GoogleLoginButton} 
          //style={{
          //  height: 40,
          //  width: 200,
          //  borderRadius: 5,
          //  backgroundColor: "white",
          //  alignItems: "center",
          //  justifyContent: "center",
          //  display: "flex",
          //}}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            style={{
              height: 20,
              width: 20,
              marginRight: 10,
              color: "#ea4335",
            }}
          />
          {this.props.isSignup ? (
            <b> Sign up with Google</b>
          ) : (
            <b> Login with Google</b>
          )}
        </button>
      </div>
    );
  }

  render() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return <div className={classes.GoogleLogin}> {this.renderSignOut()} </div>;
    } else {
      return <div className={classes.GoogleLogin}> {this.renderSignIn()} </div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
);
