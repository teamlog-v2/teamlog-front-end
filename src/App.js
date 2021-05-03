import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';
import MyPage from './user/MyPage';
import { ErrorProvider } from './context/error';
import ErrorPage from './pages/ErrorPage';
import MapPage from './map/MapPage';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <Switch>
          <Route exact path="/" component={MapPage} />
          {/* <Route path="/task" component={TaskContainer} /> */}
          <Route path="/project" component={ProjectListContainer} />
          <Route exact path="/projects/:id" component={Project} />
          <Route exact path="/users/:userId" component={MyPage} />
          <Route>
            <ErrorPage error="404" />
          </Route>
        </Switch>
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
