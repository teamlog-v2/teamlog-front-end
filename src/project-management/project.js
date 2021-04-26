import React from 'react';
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

  return (
    <>
      <CssBaseline />

      <Header
        title="도쿄 여행 프로젝트"
        introduction="동창 친구 넷이서 떠나는 도쿄 여행"
        sections={sections}
      />
      <Container maxWidth="md">
        <Container className={classes.partition} disableGutters>
          <Title title="도쿄 여행 프로젝트 소개" />
          <Introduction
            name="도쿄 여행 프로젝트"
            master_user_id="jduck1024"
            create_time="2021년 04월 17일"
            follower_count={15}
            member_count={60}
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
