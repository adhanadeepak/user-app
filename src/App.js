import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './Views/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path={`/`} component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
