import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router-dom";
import { signIn } from "../redux/auth/actions";
import { connect } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import services from "../apis/services";
import userInfo from "./Context/UserInfo";

const clientId =
  "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";

function GoogleLoginButton(props) {
  const user = useContext(userInfo);

  const onSuccess = (res) => {
    const userProfile = res.profileObj;
    const query = {
      email: userProfile.email,
      googleID: userProfile.googleId,
    };
    let url = "";
    if (props.isSignup) {
      url = "/customer/signupWithGoogle";
    } else {
      url = "/customer/loginWithGoogle";
    }

    services
      .post(url, null, { params: query })
      .then((response) => {
        const { tokenCode } = response.data;
        localStorage.setItem("token", tokenCode);
        user.login(userProfile.email, tokenCode);
        props.signIn();
        props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        signOut();
      });
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
