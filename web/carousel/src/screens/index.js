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
import VendorAccount from "./VendorAccount";
import VendorHome from "./VendorHome";

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
  const setErrorHandler = (newError) => {
    setError(newError);
  };

  const generalRoutes = [
    { path: "/login", exact: true, component: Login },
    { path: "/reset", exact: true, component: Reset },
    { path: "/forgot", exact: true, component: Forgot },
  ];
  const vendorRoutes = [
    { path: "/vendor", exact: true, component: VendorHome },
    { path: "/vendor/account", exact: false, component: VendorAccount },
  ];

  const customerRoutes = [
    { path: "/", exact: true, component: Home },
    { path: "/account", exact: false, component: Account },
  ];
  const notFound = { component: NotFound };

  let routes = [...generalRoutes];
  if (userType === "Vendor") {
    routes = [...routes, ...vendorRoutes];
  } else {
    routes = [...routes, ...customerRoutes];
  }
  routes = [...routes, notFound];

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
          error: error,
          login: loginHandler,
          changeEmail: emailChangeHandler,
          setPassword: passwordChangeHandler,
          setOldPassword: oldPasswordChangeHandler,
          setUserType: userTypeChangeHandler,
          setCompanyName: companyNameChangeHandler,
          setCompanyDomain: setCompanyDomain,
          setName: setName,
          setSurname: setSurname,
          setPasswordConfirm: confirmPasswordChangeHandler,
          setError: setErrorHandler,
        }}
      >
        <Router>
          <Header />
          <Switch>
            {routes.map((route) => (
              <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </Router>
      </UserInfo.Provider>
    </div>
  );
};

export default App;
