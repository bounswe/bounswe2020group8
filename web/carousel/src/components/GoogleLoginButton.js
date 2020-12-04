import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "1005866627235-accsl31ht1m9lh95nufh4dejqb2vq774.apps.googleusercontent.com";

export default function GoogleLoginButton(props) {
  const onSuccess = (res) => {
    console.log("success");
    const userProfile = res.profileObj;
    const query = {
      email: userProfile.email,
      id_token: res.tokenId,
    };

    //refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };
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
