import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import TechDetail from './pages/TechDetail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={TechDetail} />
      </Switch>
    </BrowserRouter>
  );
}
