import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Places from './places/pages/Places';
import Place from './places/pages/Place';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Directions from './Maps/Directions'; 
import './shared/components/Navigation/MainNavigation.css';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Places />
          </Route>
          <Route path="/:placeId/place" exact>
            <Place />
          </Route>
          <Route path="/directions" exact>
            <Directions /> 
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
