import { React, useEffect, useState } from 'react';
// import { Typography, Box, Divider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import Container from '@material-ui/core/Container';
import loadable from '@loadable/component';
import { makeStyles } from '@material-ui/core';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

// import ProjectMain from './projectmain';
// import TestFile from './testfile';
import Header from './header';
import ProjectMain from './projectmain';
import PostMain from './postmain';
// import TaskContainer from '../task/TaskContainer';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'fixed',
    zIndex: 999,
    [theme.breakpoints.down('sm')]: {
      left: '90%',
      top: '90%',
    },
    [theme.breakpoints.up('md')]: {
      left: '80%',
      top: '90%',
    },
  },
}));

const Project = ({ match }) => {
  const classes = useStyles();
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetch(`/api/projects/${match.params.id}`)
    .then((res) => res.json()).then((info) => setProject(info));
  }, []);

  const sections = [
    { title: '홈', url: `/projects/${match.params.id}` },
    { title: '포스트', url: `/projects/${match.params.id}/post` },
    { title: '태스크', url: `/projects/${match.params.id}/task` },
    { title: '멤버', url: `/projects/${match.params.id}/member` },
    { title: '팔로워', url: `/projects/${match.params.id}/follower` },
  ];

  const TaskContainer = loadable(() => import('../task/TaskContainer'));

  return (
    <>
      <CssBaseline />
      <Link to={`/projects/${match.params.id}/new`}>
        <Fab
          className={classes.button}
          color="primary"
        >
          <EditIcon />
        </Fab>
      </Link>

      <BrowserRouter>
        <Header
          title={project.name}
          introduction={project.introduction}
          sections={sections}
        />
        <Route exact path="/projects/:id" component={ProjectMain} />
        <Route exact path="/projects/:id/post" component={PostMain} />
        <Route exact path="/projects/:id/task" component={TaskContainer} />
      </BrowserRouter>
    </>
  );
};

export default Project;
