import React from "react";
import GoogleAuth from "../../components/GoogleAuth";
import SignUpComponent from "../../components/SignUp/SignUp"


export default function SignUp() {
  return (
      <div className="App">
        <header className="App-header">   
          <SignUpComponent />
          <GoogleAuth />
        </header>
      </div>
  );
}
