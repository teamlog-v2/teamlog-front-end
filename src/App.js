import './App.css';
import React from 'react';
import Project from './project-management/project';

function App() {
  return (
    <div className="App">
      {/* <Postlist/> */}
      <Project />
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
