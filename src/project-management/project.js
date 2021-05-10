import { React } from 'react';
// import { Typography, Box, Divider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

import { Switch, Route, Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

// import ProjectMain from './projectmain';
// import TestFile from './testfile';
import Header from './header';
import ProjectMain from './projectmain';
import PostMain from './postmain';
import MemberTab from './MemberTab';
import TaskContainer from '../task/TaskContainer';

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

export default function Project() {
  const { id: projectId } = useParams();

  const classes = useStyles();

  const sections = [
    { title: '홈', url: '', component: ProjectMain },
    { title: '포스트', url: '/post', component: PostMain },
    { title: '태스크', url: '/task', component: TaskContainer },
    { title: '멤버', url: '/member', component: MemberTab },
    { title: '팔로워', url: '/follower' },
  ];

  return (
    <>
      <CssBaseline />

      <Link to={`/projects/${projectId}/new`}>
        <Fab className={classes.button} color="primary">
          <EditIcon />
        </Fab>
      </Link>

      <Header sections={sections} />

      <Switch>
        {sections.map((section, index) => (
          <Route
            key={index}
            exact
            path={`/projects/:id${section.url}`}
            component={section.component}
          />
        ))}
      </Switch>
    </>
  );
}
