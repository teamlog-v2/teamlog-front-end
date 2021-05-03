import './App.css';
import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
// import loadable from '@loadable/component';
// import Project from './project-management/project';
import ProjectListContainer from './project/ProjectListContainer';
import Project from './project-management/project';

// import FileTest from './file/filetest';

function App() {
  // const TaskContainer = loadable(() => import('./task/TaskContainer'));

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route exact path="/" component={Project} />
      </BrowserRouter> */}
      {/* <Project id={9} /> */}
      {/* <FileTest /> */}
      {/* <FriendList/> */}
      <BrowserRouter>
        <Switch>
          <Redirect exact path="/" to="/project" />
          {/* <Route path="/task" component={TaskContainer} /> */}
          <Route path="/project" component={ProjectListContainer} />
          <Route exact path="/projects/:id" component={Project} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
