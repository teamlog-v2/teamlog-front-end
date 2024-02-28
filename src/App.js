import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import { BeamsClientProvider } from './contexts/beamsClient';
import { ErrorProvider } from './contexts/error';

import AppBar from './AppBar';
import AccountEditForm from './account/AccountEditForm';
import MyPage from './account/MyPage';
import SignIn from './account/SignIn';
import SignUp from './account/SignUp';
import MapPage from './map/newMapPage';
import NewsPage from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import SettingPage from './pages/SettingPage';
import Project from './project-management/project';
import ProjectForm from './project/ProjectForm';
import ProjectListContainer from './project/ProjectListContainer';

const App = () => (
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

          <Route exact path="/accounts/:accountId" component={MyPage} />
          <Route exact path="/accounts/:accountId/edit" component={AccountEditForm} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route path="/accounts/:accountId/setting" component={SettingPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </BeamsClientProvider>
    </AuthProvider>
  </ErrorProvider>
);

export default App;
