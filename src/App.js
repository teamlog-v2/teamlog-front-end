import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ErrorProvider } from './context/error';
import ErrorPage from './ErrorPage';
import ProjectPage from './project/ProjectPage';

const App = () => {
  return (
    <Router>
      <ErrorProvider>
        <Switch>
          <Redirect exact path="/" to="/projects/9/posts" />
          {/* <Route exact path="/" component={HomePage} /> */}
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
