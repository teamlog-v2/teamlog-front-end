import './App.css';
import React from 'react';
import Project from './project-management/project';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import ProjectListContainer from './/project/ProjectListContainer';

// import FileTest from './file/filetest';

function App() {
  const  TaskContainer = loadable(() => import('./task/TaskContainer'));

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route exact path="/" component={Project} />
      </BrowserRouter> */}
      <Project id={9} />
      {/* <FileTest /> */}
      {/* <FriendList/> */}
      <Switch>
      <Redirect exact path="/" to="/project" />
      <Route path="/task" component={TaskContainer} />
      <Route path="/project" component={ProjectListContainer}/>
      </Switch>
    </div>
  );
}

// const Temp = () => {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

export default App;
