import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from '../components/Dashboard';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  </Router>
);