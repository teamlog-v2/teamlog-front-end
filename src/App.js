import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ErrorProvider } from './contexts/error';
import { AuthProvider } from './contexts/auth';

import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';
import MyPage from './user/MyPage';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import UserEditForm from './user/UserEditForm';
import NotFoundPage from './pages/NotFoundPage';
// import MapPage from './map/MapPage';

// 지도 api 낭비하기 싫어서 주석처리
const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Switch>
          <Redirect exact path="/" to="/login" />

          {/* <Route exact path="/main" component={MapPage} /> */}
          <Route path="/project" component={ProjectListContainer} />
          <Route path="/projects/:id" component={Project} />
          <Route exact path="/users/:userId" component={MyPage} />
          <Route exact path="/users/:userId/edit" component={UserEditForm} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />

          <Route component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </ErrorProvider>
  );
};

export default App;
