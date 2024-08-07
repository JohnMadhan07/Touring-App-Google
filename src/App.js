import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Users from './user/pages/Users';
import Place from './places/pages/Place';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Directions from './Maps/Directions'; // Import the Directions component
import './shared/components/Navigation/MainNavigation.css';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/place" exact>
            <Place />
          </Route>
          <Route path="/directions" exact>
            <Directions /> {/* Add the Directions component route */}
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
