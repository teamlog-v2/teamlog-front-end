import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Postlist} from './post-management/postlist.js'
import {Project} from './project-management/project.js'

function App() {
  return (
    <div className="App">
      {/* <Postlist/> */}
        <Project></Project>
    </div>
  );
}

export default App;
