import { Avatar, Box, Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';
import { convertResourceUrl } from '../utils';

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
          <Typography variant="h6">👑 프로젝트 마스터</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {master !== undefined ? (
          <Grid item sm={6} xs={12}>
            <Card elevation={2}>
              <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                  <Link
                    to={`/accounts/${master.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.profileImg}
                        src={convertResourceUrl(master.profileImgPath)}
                      />
                      <Typography variant="body1" color="textPrimary">
                        {master.name}&nbsp;
                      </Typography>
                      <Typography variant="body1" color="textPrimary">
                        ({master.id})
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Grid>
        ) : (<></>)}

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
          <Typography variant="h6">👨‍👧‍👧 프로젝트 멤버</Typography>
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
                    to={`/accounts/${member.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.profileImg}
                        src={convertResourceUrl(member.profileImgPath)}
                      />
                      <Typography variant="body1" color="textPrimary">
                        {member.name}&nbsp;
                      </Typography>
                      <Typography variant="body1" color="textPrimary">
                        ({member.id})
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
    `${process.env.REACT_APP_API_URL}/api/projects/${projectId}/members`,
  );

  const [project, isProjectLoaded, projectsLoadError] = useFetchData(
    `${process.env.REACT_APP_API_URL}/api/projects/${projectId}`,
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
