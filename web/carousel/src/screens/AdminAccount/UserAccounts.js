import React, { Component } from "react";
import UserAccountsComponent from "../../components/Admin/UserAccounts/UserAccountsComponent";

export default class UserAccounts extends Component {
  render() {
    return (
      <div className="Admin-UserAccounts">
        <header className="UserAccounts">
          <UserAccountsComponent />
        </header>
      </div>
    );
  }
}
