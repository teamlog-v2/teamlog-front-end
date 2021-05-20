import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';
import MyPage from './user/MyPage';
import { ErrorProvider } from './contexts/error';
import { SignProvider } from './contexts/sign';
import ErrorPage from './pages/ErrorPage';
// import MapPage from './map/MapPage';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';

// 지도 api 낭비하기 싫어서 주석처리
const App = () => {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <SignProvider>
          <Switch>
            <Redirect exact path="/" to="/login" />
            {/* <Route exact path="/main" component={MapPage} /> */}
            <Route path="/project" component={ProjectListContainer} />
            <Route path="/projects/:id" component={Project} />
            <Route exact path="/users/:userId" component={MyPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={SignIn} />
            <Route>
              <ErrorPage error="404" />
            </Route>
          </Switch>
        </SignProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
