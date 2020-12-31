import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Reset from "./Reset";
import Account from "./Account";
import Forgot from "./Forgot";
import AdminAccount from "./AdminAccount";
import UserInfo from "../components/Context/UserInfo";

import Header from "../components/Header/Header";
import AdminLogin from "./AdminLogin";
import NotFound from "./NotFound";
import Product from "../components/Product/Product";
import Search from "./Search";
import VendorAccount from "./VendorAccount";
import VendorHome from "./VendorHome";

function PrivateRoute({ component: Component, authed, ...rest }) {
  console.log("authed: ", localStorage.getItem("login"));
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("login") === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

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
  const [error, setError] = useState(false);
  const [IBAN, setIBAN] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [vendorLocations, setVendorLocations] = useState([]);

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

  const generalRoutes = [
    { path: "/login", exact: true, component: Login },
    { path: "/reset", exact: true, component: Reset },
    { path: "/forgot", exact: true, component: Forgot },
    { path: "/search", exact: true, component: Search },
    { path: "/product/:id", exact: true, component: Product },
    {
      path: "/administration/login/admin",
      exact: true,
      component: AdminLogin,
    },
  ];
  const vendorRoutes = [
    { path: "/vendor", exact: true, component: VendorHome },
    { path: "/vendor/account", exact: false, component: VendorAccount },
    { path: "/", exact: true, component: VendorHome },
  ];

  const customerRoutes = [
    { path: "/", exact: true, component: Home },
    { path: "/account", exact: false, component: Account },
  ];

  const adminRoutes = [{ path: "/admin", component: AdminAccount }];

  const guestRoutes = [
    { path: "/", exact: true, component: Home },
    { path: "/account", exact: false, component: Login },
    { path: "/vendor", exact: false, component: Login },
    { path: "/vendor/account", exact: false, component: Login },
  ];

  const notFound = { component: NotFound };

  let routes = [...generalRoutes];

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  if (userType === "Vendor") {
    routes = [...routes, ...vendorRoutes];
  } else if (userType === "Customer") {
    routes = [...routes, ...customerRoutes];
  } else if (userType === "Admin") {
    routes = [...routes, ...adminRoutes];
  } else {
    routes = [...routes, ...guestRoutes];
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
            {routes.map((route) => (
              <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <PrivateRoute
              authed={localStorage.getItem("login")}
              path="/account"
              component={Account}
            />
          </Switch>
        </Router>
      </UserInfo.Provider>
    </div>
  );
};

export default App;
