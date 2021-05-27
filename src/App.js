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
import AppBar from './AppBar';
import TeamForm from './team/TeamForm';
import ProjectForm from './project/ProjectForm';
import TeamPage from './team/TeamPage';
import SearchPage from './pages/SearchPage';
import Team from './team/Team';
import NewsPage from './pages/NewsPage';
// import MapPage from './map/MapPage';

// 지도 api 낭비하기 싫어서 주석처리
const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <AppBar />
        <Switch>
          <Redirect exact path="/" to="/login" />
          <Route exact path="/news" component={NewsPage} />

          <Route path="/create-project" component={ProjectForm} />
          <Route path="/project" component={ProjectListContainer} />
          <Route path="/projects/:id" component={Project} />

          <Route path="/create-team" component={TeamForm} />
          <Route path="/teams/:id/settings" />
          <Route path="/teams/:id" component={Team} />

          <Route path="/search" component={SearchPage} />

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
