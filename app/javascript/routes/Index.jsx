import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import Stacks from '../containers/Stacks';
import Stack from '../components/Stack';
import NewStack from '../components/NewStack';
import EditStack from '../components/EditStack';
import Progress from '../containers/Progress';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path="/stacks" exact component={Stacks} />
      <Route path="/stack/:id" exact component={Stack} />
      <Route path="/stack" exact component={NewStack} />
      <Route path="/edit/:id" exact component={EditStack} />
      <Route path="/progress" exact component={Progress} />
    </Switch>
  </Router>
);
