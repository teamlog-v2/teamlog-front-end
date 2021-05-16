import { Avatar, Box, Button, Card, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';

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
    <Container maxWidth="md" style={{ marginBottom: '2em' }}>
      <Grid>
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
              <Box margin="10px" display="flex" alignItems="center">
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  팔로잉
                </Button>
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
  const { members } = props;

  return (
    <Container>
      <Grid container>
        <Grid item style={{ margin: '1em 0' }} xs={12}>
          <Typography variant="h6" gutterBottom>👨‍👧‍👧 멤버</Typography>
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
                <Box margin="10px" display="flex" alignItems="center">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                  >
                    팔로잉
                  </Button>
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
  console.log(projectsLoadError);

  const { useHandleError } = useContext(ErrorContext);
  useHandleError(membersLoadError);

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
      <Member members={members} />
    </Container>
  );
};

export default MemberTab;
