import './App.css';
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import loadable from '@loadable/component';
// import Project from './project-management/project';
import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';
import MyPage from './user/MyPage';
import { ErrorProvider } from './context/error';
import ErrorPage from './ErrorPage';
import MapPage from './map/MapPage';

// import FileTest from './file/filetest';

function App() {
  // const TaskContainer = loadable(() => import('./task/TaskContainer'));

  // 실험차원에서 프로젝트 리스트 컴포넌트 페이지에서 시작
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
}

export default App;
