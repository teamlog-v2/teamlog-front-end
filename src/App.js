import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ErrorProvider } from './contexts/error';
import { AuthProvider } from './contexts/auth';
import { BeamsClientProvider } from './contexts/beamsClient';

import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';
import MyPage from './user/MyPage';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import UserEditForm from './user/UserEditForm';
import NotFoundPage from './pages/NotFoundPage';
import AppBar from './AppBar';
import ProjectForm from './project/ProjectForm';
import SearchPage from './pages/SearchPage';
import NewsPage from './pages/NewsPage';
import SettingPage from './pages/SettingPage';
// import MapPage from './map/MapPage';
import MapPage from './map/newMapPage';

const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <BeamsClientProvider>
          <AppBar />
          <Switch>
            <Redirect exact path="/" to="/main" />
            <Route exact path="/main" component={MapPage} />
            <Route exact path="/news" component={NewsPage} />

            <Route path="/create-project" component={ProjectForm} />
            <Route path="/project" component={ProjectListContainer} />
            <Route path="/projects/:id/map" component={MapPage} />
            <Route path="/projects/:id" component={Project} />

            <Route path="/teams/:id/settings" />

            <Route path="/search" component={SearchPage} />

            <Route exact path="/accounts/:userId" component={MyPage} />
            <Route exact path="/accounts/:userId/edit" component={UserEditForm} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={SignIn} />
            <Route path="/accounts/:userId/setting" component={SettingPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </BeamsClientProvider>
      </AuthProvider>
    </ErrorProvider>
  );
};

export default App;
