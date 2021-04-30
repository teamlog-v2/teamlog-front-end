import { React, useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Container from '@material-ui/core/Container';
import Header from './header';
import Introduction from './introduction';
import Postlist from '../post-management/postlist';

const useStyles = makeStyles((theme) => ({
  // arrowButton: {
  //     zIndex: 'tooltip'
  // },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  partition: {
    marginTop: '2.5em',
    marginBottom: '2.5em',
  },
  subtitle: {
    // 글씨 크기 등 적용할 예정
  },
}));

const sections = [
  { title: '홈', url: '#' },
  { title: '포스트', url: '/post' },
  { title: '태스크', url: '/task' },
  { title: '멤버', url: 'member' },
  { title: '팔로워', url: 'follower' },
];

const Project = () => {
  const classes = useStyles();
  const [project, setProject] = useState([]);

  const id = 1; // 얘는 어떻게 전달받을지 알아보자

  useEffect(() => {
    fetch(`http://localhost:8080/teamlog-api/project/id=${id}`)
    .then((res) => res.json()).then((info) => setProject(info));
  }, []);

  return (
    <>
      <CssBaseline />

      <Header
        title={project.name}
        introduction={project.introduction}
        sections={sections}
      />
      <Container maxWidth="md">
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
      </Container>
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

const Title = (props) => {
  const { title } = props;

  return (
    <Box margin="0.5em">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default Project;
