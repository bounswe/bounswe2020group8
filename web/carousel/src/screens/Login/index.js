import React from "react";
import GoogleAuth from "../../components/GoogleAuth";
import ProductTable from "../../components/ProductTable";

export default function Login() {
  return (
      <div className="App">
        <header className="App-header">
          <GoogleAuth />

        </header>
      </div>

  );
}
