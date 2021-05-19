import { Avatar, Box, Button, Card, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';
import { GetProjectApplcants, JoinProject } from './projectapi';

const useStyles = makeStyles(() => ({
  profileImg: {
    margin: '10px',
    width: '60px',
    height: '60px',
  },
}));

const Master = (props) => {
  const classes = useStyles();

  const { project, members } = props;
  const master = members.filter((candidate) => project.masterId === candidate.id)[0];

  return (
    <Container maxWidth="md" style={{ margin: '2em 0' }}>
      <Grid container>
        <Grid item style={{ margin: '1em 0' }} xs={12}>
          <Typography variant="h6">👑 마스터</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Card elevation={2}>
            <Box display="flex" flexDirection="row">
              <Box flexGrow={1}>
                <Link
                  to={`/users/${master.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      className={classes.profileImg}
                      src={master.profileImgPath}
                    />
                    <Typography variant="body1" color="textPrimary">
                      {master.name}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const Member = (props) => {
  const classes = useStyles();
  const { projectId, members } = props;
  const [isLogin, setIsLogin] = useState(true);
  const [isApplyed, setIsApplyed] = useState();

  useEffect(async () => {
    const response = await GetProjectApplcants(projectId);
    if (response.status === 401) {
      setIsLogin(false);
      return;
    }

    if (response.status === 200) {
      const applicants = await response.json();
      console.log(applicants);
      // const contains = (val) => applicants.some(({ id }) => id.includes(val));
    }
  }, []);

  if (!isLogin) {
    window.console.log('세션이 만료되었습니다. 로그인 화면으로 돌아갑니다.');
    return <Redirect to="/login" />;
  }

  const Apply = async () => {
    const response = await JoinProject(projectId);

    if (response.status === 401) {
      setIsLogin(false);
      return;
    }

    if (response.status === 201) {
      setIsApplyed(true);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
          <Typography variant="h6">👨‍👧‍👧 멤버</Typography>
        </Grid>
        <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
          { !isApplyed ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={Apply}
            >멤버 신청
            </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
              >신청 완료
              </Button>
          ) }

        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {members.map((member) => (
            // <div key={member.id}>{member.id}</div>
          <Grid item sm={6} xs={12}>
            <Card elevation={2}>
              <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                  <Link
                    to={`/users/${member.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.profileImg}
                        src={member.profileImgPath}
                      />
                      <Typography variant="body1" color="textPrimary">
                        {member.name}
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Grid>
          ))}
      </Grid>
    </Container>
  );
};

const MemberTab = () => {
  const { id: projectId } = useParams();

  const [members, isMemebersLoaded, membersLoadError] = useFetchData(
    `/api/projects/${projectId}/members`,
  );

  const [project, isProjectLoaded, projectsLoadError] = useFetchData(
    `/api/projects/${projectId}`,
  );

  const { useHandleError } = useContext(ErrorContext);
  useHandleError(membersLoadError);
  useHandleError(projectsLoadError);

  if (!isMemebersLoaded || !isProjectLoaded) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>
          <Typography> 멤버 목록을 불러오고 있어요!</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="md">
      <Master project={project} members={members} />
      <Member projectId={projectId} members={members} />
    </Container>
  );
};

export default MemberTab;
