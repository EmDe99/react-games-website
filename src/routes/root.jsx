
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Games from '../components/Games';

const HomeRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/games" component={Games} />
    </Switch>
  );
};

export default Routes;
