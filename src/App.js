import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import SignUp from './user/SignUp';
import MyPage from './user/MyPage';

const TaskContainer = loadable(() => import('./task/TaskContainer'));
const UserContainer = loadable(() => import('./user/UserContainer'));

const App = () => (
  <Switch>
    <Redirect exact path="/" to="/user" />
    <Route path="/task" component={TaskContainer} />
    <Route path="/user" component={UserContainer} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/myPage" component={MyPage} />
  </Switch>
);
export default App;
