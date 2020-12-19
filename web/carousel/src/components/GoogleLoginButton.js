import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { signIn } from "../redux/auth/actions";
import { connect } from "react-redux";
import { useGoogleLogout } from "react-google-login";

const apiBaseUrl = "http://54.165.207.44:8080/";
const clientId =
  "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";

function GoogleLoginButton(props) {
  const onSuccess = (res) => {
    console.log(
      "AA ~ file: GoogleLoginButton.js ~ line 15 ~ onSuccess ~ res",
      res
    );
    const userProfile = res.profileObj;
    const query = {
      email: userProfile.email,
      googleID: userProfile.googleId,
    };
    let url = apiBaseUrl;
    if (props.isSignup) {
      url += "customer/signupWithGoogle";
    } else {
      url += "customer/loginWithGoogle";
    }

    axios
      .post(url, null, { params: query })
      .then((response) => {
        const { tokenCode } = response.data;
        localStorage.setItem("token", tokenCode);
        props.signIn();
        props.history.push("/");
      })
      .catch((err, response) => {
        console.log("response", response);
        signOut();
      });
    //refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    alert(`Failed to login. 😢`);
  };
  const onLogoutSuccess = (res) => {
    alert("You have already sign up.");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText={props.title}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}
export default withRouter(connect(null, { signIn })(GoogleLoginButton));
