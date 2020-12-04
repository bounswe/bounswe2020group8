import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { signOut } from "../redux/auth/actions";

const clientId =
  "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";

function Logout(props) {
  const onSuccess = () => {
    props.signOut();
    alert("Logout made successfully ✌");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default connect(null, { signOut })(Logout);
