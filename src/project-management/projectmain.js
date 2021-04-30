import { Box, Container, Divider, makeStyles, Typography } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
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

const Title = (props) => {
  const { title } = props;

  return (
    <Box margin="0.5em">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

const ProjectMain = ({ match }) => {
    const classes = useStyles();
    const projectId = match.params.id;
    
    const [project, setProject] = useState([]);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:8080/api/projects/${projectId}`)
      .then((res) => res.json()).then((info) => setProject(info));
    }, []);
    console.log(postList);

    return (
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
          <Postlist projectId = {projectId}/>
        </Container>
      </Container>
    );
};

export default ProjectMain;
