import { React, useEffect, useState } from 'react';
// import { Typography, Box, Divider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import Container from '@material-ui/core/Container';
import loadable from '@loadable/component';

import { BrowserRouter, Route } from 'react-router-dom';

// import ProjectMain from './projectmain';
// import TestFile from './testfile';
import Header from './header';
import ProjectMain from './projectmain';
// import TaskContainer from '../task/TaskContainer';

// import Introduction from './introduction';
// import Postlist from '../post-management/postlist';

// const useStyles = makeStyles((theme) => ({
//   // arrowButton: {
//   //     zIndex: 'tooltip'
//   // },
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
//   partition: {
//     marginTop: '2.5em',
//     marginBottom: '2.5em',
//   },
//   subtitle: {
//     // 글씨 크기 등 적용할 예정
//   },
// }));

const Project = ({ id }) => {
  // const classes = useStyles();
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetch(`http://3.15.16.150:8090/api/projects/${id}`)
    .then((res) => res.json()).then((info) => setProject(info));
  }, []);

  const sections = [
    { title: '홈', url: `/projects/${id}` },
    { title: '포스트', url: `/projects/post/${id}` },
    { title: '태스크', url: `/projects/task/${id}` },
    { title: '멤버', url: `/projects/member/${id}` },
    { title: '팔로워', url: `/projects/follower/${id}` },
  ];

  const TaskContainer = loadable(() => import('../task/TaskContainer'));

  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Header
          title={project.name}
          introduction={project.introduction}
          sections={sections}
        />
        <Route exact path="/projects/:id" component={ProjectMain} />
        {/* <Route exact path="/projects/task/:id" component={TestFile} /> */}
        <Route exact path="/projects/task/:id" component={TaskContainer} />
      </BrowserRouter>
      {/* <Route exact path="/" render={() => <ProjectMain projectInfo={project} />} />
        <Route path="/task" component={TestFile} />
      </BrowserRouter> */}
      {/* <Container maxWidth="md">
        <Container className={classes.partition} disableGutters>
          <Title title={project.name} />
          <Introduction
            name={project.name}
            masterUserId={project.master_user_id}
            createTime={project.create_time}
            followerCount={15}
            memberCount={60}
          />
        </Container>
        <Divider light />
        <Container className={classes.partition} disableGutters>
          <Title title="스토리보드" />
          <Postlist />
        </Container>
      </Container> */}
    </>
  );
};

// const UpwardButton = () => {
//   const classes = useStyles();
//   return (
//     <Box className={classes.arrowButton}>
//       <Fab color="primary" aria-label="add">
//         <ArrowUpwardIcon />
//       </Fab>
//     </Box>
//   );
// };

// const Title = (props) => {
//   const { title } = props;

//   return (
//     <Box margin="0.5em">
//       <Typography variant="h6">{title}</Typography>
//     </Box>
//   );
// };

export default Project;
