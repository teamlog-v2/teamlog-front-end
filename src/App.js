import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Postlist} from './post-management/postlist.js'
import {Project} from './project-management/project.js'
import { FriendList } from './post-management/friendlist.js'

function App() {
  return (
    <div className="App">
        {/* <Postlist/> */}
        <Project></Project>
        {/* <FriendList/> */}
    </div>
  );
}

export default App;
