import React from 'react';
import './App.css';
import Genreslist from './components/Genreslist';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/genres/:id" component={Genreslist} />
          <Route path="/genres" component={Genreslist} />

          <Route path="/">
            <Redirect to="/genres" />
          </Route>
          <Route path="*">
            <Redirect to="/genres" />
          </Route>
        </Switch>
      </div >
    </Router>
  );
}

export default App;
