import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import NewUser from "../components/NewUser";
import User from '../components/User';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/create" exact component={NewUser} />
      <Route path="/users/:id" exact component={User} />
    </Switch>
  </Router>
);