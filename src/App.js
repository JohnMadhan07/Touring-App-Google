import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import Place from './places/pages/Place';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import './shared/components/Navigation/MainNavigation.css'

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/place" exact>
          <Place />
        </Route>
      </Switch>
      </main>
    </Router>
  );
};

export default App;
