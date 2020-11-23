import React from "react";
import {useContext, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import UserInfo from "../components/Context/UserInfo";

import Header from "../components/Header/Header";

const App = () => {
  const [email, setEmail] = useState("");

  const loginHandler = (newEmail) => {
      setEmail(newEmail);
  };
  
  console.log("email: " + email);
  return (
    <>
      <UserInfo.Provider value={{
                email: email,
                login: loginHandler
            }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </UserInfo.Provider>
    </>
  );
};

export default App;
