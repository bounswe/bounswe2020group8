import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Reset from "./Reset";
import Forgot from "./Forgot";
import UserInfo from "../components/Context/UserInfo";

import Header from "../components/Header/Header";

const App = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(false);

  const loginHandler = (newEmail, newToken) => {
    setEmail(newEmail);
    setToken(newToken);
  };
  const emailChangeHandler = (newEmail) => {
    setEmail(newEmail);
  };
  const passwordChangeHandler = (newPassword) => {
    setPassword(newPassword);
  };
  const confirmPasswordChangeHandler = (newConfirmPassword) => {
    setPasswordConfirm(newConfirmPassword);
  };
  const userTypeChangeHandler = (newUserType) => {
    setUserType(newUserType);
  };
  const companyNameChangeHandler = (newCompanyName) => {
    setCompanyName(newCompanyName);
  };
  const setErrorHandler = (newError) => {
    setError(newError);
  };

  return (
    <div>
      <UserInfo.Provider
        value={{
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          userType: userType,
          name: name,
          surname: surname,
          companyName: name,
          error: error,
          login: loginHandler,
          changeEmail: emailChangeHandler,
          setPassword: passwordChangeHandler,
          setUserType: userTypeChangeHandler,
          setCompanyName: companyNameChangeHandler,
          setName: setName,
          setSurname: setSurname,
          setPasswordConfirm: confirmPasswordChangeHandler,
          setError: setErrorHandler,
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/reset" exact component={Reset} />
          </Switch>
        </Router>
      </UserInfo.Provider>
    </div>
  );
};

export default App;
