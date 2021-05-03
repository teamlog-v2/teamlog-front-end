import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorProvider } from './context/error';
import ErrorPage from './ErrorPage';
import MapPage from './map/MapPage';
import ProjectPage from './project/ProjectPage';

const App = () => {
  return (
    <Router>
      <ErrorProvider>
        <Switch>
          <Route exact path="/" component={MapPage} />
          {/* <Route path="/users/:userId" component={UserPage} /> */}
          {/* <Route path="/teams/:teamId" component={TeamPage} /> */}
          <Route path="/projects/:projectId" component={ProjectPage} />
          <Route>
            <ErrorPage error="404" />
          </Route>
        </Switch>
      </ErrorProvider>
    </Router>
  );
};

export default App;
