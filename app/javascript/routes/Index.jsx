import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import Stacks from '../containers/Stacks';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path='/stacks' exact component={Stacks} />
    </Switch>
  </Router>
);