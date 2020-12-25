import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Reset from "./Reset";
import Account from "./Account";
import Forgot from "./Forgot";
import UserInfo from "../components/Context/UserInfo";
import Header from "../components/Header/Header";
import NotFound from "./NotFound";

const App = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [vendorLocations, setVendorLocations] = useState([]);
  const [error, setError] = useState(false);
  const [IBAN, setIBAN] = useState("");

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
  const oldPasswordChangeHandler = (oldPassword) => {
    setOldPassword(oldPassword);
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
  const vendorLocationHandler = (newLocations) => {
    setVendorLocations(newLocations);
  };
  const addVendorLocationHandler = (newVendorLocation) => {
    setVendorLocations([...vendorLocations, newVendorLocation]);
  };
  const removeVendorLocationHandler = (
    removedLocationLat,
    removedLocationLng
  ) => {
    setVendorLocations(
      vendorLocations.filter(
        (location) =>
          location.latitude !== removedLocationLat ||
          location.longitude !== removedLocationLng
      )
    );
  };

  const setErrorHandler = (newError) => {
    setError(newError);
  };

  return (
    <div>
      <UserInfo.Provider
        value={{
          oldPassword: oldPassword,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          userType: userType,
          name: name,
          surname: surname,
          companyName: companyName,
          companyDomain: companyDomain,
          vendorLocations: vendorLocations,
          error: error,
          IBAN: IBAN,
          login: loginHandler,
          changeEmail: emailChangeHandler,
          setPassword: passwordChangeHandler,
          setOldPassword: oldPasswordChangeHandler,
          setUserType: userTypeChangeHandler,
          setCompanyName: companyNameChangeHandler,
          setCompanyDomain: setCompanyDomain,
          setVendorLocations: vendorLocationHandler,
          addVendorLocation: addVendorLocationHandler,
          removeVendorLocation: removeVendorLocationHandler,
          setName: setName,
          setSurname: setSurname,
          setPasswordConfirm: confirmPasswordChangeHandler,
          setError: setErrorHandler,
          setEmail: setEmail,
          setIBAN: setIBAN,
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/account" component={Account} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Router>
      </UserInfo.Provider>
    </div>
  );
};

export default App;
