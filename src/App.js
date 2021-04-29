import './App.css';
import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
import Project from './project-management/project';

// import FileTest from './file/filetest';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route exact path="/" component={Project} />
      </BrowserRouter> */}
      <Project />
      {/* <FileTest /> */}
      {/* <FriendList/> */}
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
