import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

import Header from "../components/Header/Header";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
