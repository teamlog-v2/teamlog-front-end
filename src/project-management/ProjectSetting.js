import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { convertResourceUrl } from '../utils';
import {
  InvitationAccept,
  RefuseProject,
  LeaveProject,
  GetUserProjects,
  GetInvitedProjects,
  GetAppliedProjects,
} from './projectapi';

const DeleteButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    color: 'white',
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'rgb(220, 0, 78)',
    borderColor: 'rgb(220, 0, 78)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'rgb(162, 0, 56)',
      borderColor: 'rgb(162, 0, 56)',
      boxShadow: '-0.05em 0.05em 0.2em 0.1em rgba(0, 0, 0, 0.3)',
    },
    '&:active': {
      backgroundColor: 'rgb(162, 0, 56)',
      borderColor: 'rgb(162, 0, 56)',
      boxShadow: '-0.05em 0.05em 0.2em 0.1em rgba(0, 0, 0, 0.3)',
    },
  },
})(Button);

const ParticipatingTeams = ({ userId, projects, setProjects }) => {
  const history = useHistory();

  return (
    <Grid container xs={12} spacing={2}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card elevation={2}>
              <Link
                to={`/projects/${project.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  style={{ height: 180 }}
                  image={convertResourceUrl(project.thumbnail)}
                />
              </Link>
              <CardContent>
                <Grid container direction="column">
                  <Link
                    to={`/projects/${project.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Grid item xs={6}>
                      <Typography gutterBottom variant="h6" noWrap>
                        {project.name}
                      </Typography>
                    </Grid>
                  </Link>
                  <Grid contianer item xs={12} style={{ textAlign: 'right' }}>
                    <Grid item>
                      {project.masterId === userId ? (
                        <Button
                          color="primary"
                          variant="contained"
                          justify="flex-end"
                          alignItems="center"
                          onClick={() => {
                            history.push(
                              `/projects/${project.id}/projectmanagement`,
                            );
                          }}
                        >
                          관리
                        </Button>
                      ) : (
                        <DeleteButton
                          color="primary"
                          variant="contained"
                          onClick={async () => {
                            if (
                              window.confirm(
                                '정말로 프로젝트를 탈퇴하시겠습니까?',
                              )
                            ) {
                              const { status } = await LeaveProject(project.id);
                              if (status === 200) {
                                const userTeamsResponse = await GetUserProjects(
                                  userId,
                                );
                                setProjects(await userTeamsResponse.json());
                              }
                            }
                          }}
                        >
                          탈퇴
                        </DeleteButton>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '50vh' }}
        >
          아직 참여 중인 프로젝트가 없어요. 😢
        </Grid>
      )}
    </Grid>
  );
};

const AppliedProjects = ({ userId, projects, setProjects }) => {
  return (
    <Grid container xs={12} spacing={2}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card elevation={2}>
              <Link
                to={`/projects/${project.projectId}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  style={{ height: 180 }}
                  image={convertResourceUrl(project.thumbnail)}
                />
              </Link>
              <CardContent>
                <Grid container xs={12} direction="column">
                  <Link
                    to={`/projects/${project.projectId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Grid item xs={6}>
                      <Typography gutterBottom variant="h6" noWrap>
                        {project.projectName}
                      </Typography>
                    </Grid>
                  </Link>
                  <Grid contianer item xs={12} style={{ textAlign: 'right' }}>
                    <Grid item>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={async () => {
                          if (
                            window.confirm(
                              '프로젝트 가입 신청을 취소하시겠습니까?',
                            )
                          ) {
                            const { status } = await RefuseProject(project.id);
                            if (status === 200) {
                              const userTeamsResponse = await GetUserProjects(
                                userId,
                              );
                              setProjects(await userTeamsResponse.json());
                            }
                          }
                        }}
                      >
                        취소
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '50vh' }}
        >
          아직 가입 신청하신 프로젝트가 없어요. 😢
        </Grid>
      )}
    </Grid>
  );
};

const InvitedProjects = ({
  userId,
  projects,
  setUserProjects,
  setInvitedProjects,
}) => {
  console.log(projects);
  return (
    <Grid container xs={12} spacing={2}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card elevation={2}>
              <Link
                to={`/projects/${project.projectId}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  style={{ height: 180 }}
                  image={convertResourceUrl(project.thumbnail)}
                />
              </Link>
              <CardContent>
                <Grid container direction="column">
                  <Link
                    to={`/projects/${project.projectId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Grid item xs={6}>
                      <Typography gutterBottom variant="h6">
                        {project.projectName}
                      </Typography>
                    </Grid>
                  </Link>
                  <Grid contianer item style={{ textAlign: 'right' }}>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ margin: '0.5em 0' }}
                      onClick={async () => {
                        if (
                          window.confirm('프로젝트 초대를 수락하시겠습니까?')
                        ) {
                          const { status } = await InvitationAccept(
                            project.projectId,
                          );
                          if (status === 201) {
                            const userProjectsResponse = await GetUserProjects(
                              userId,
                            );
                            const invitedProjectResponse = await GetInvitedProjects();
                            setUserProjects(await userProjectsResponse.json());
                            setInvitedProjects(
                              await invitedProjectResponse.json(),
                            );
                          }
                        }
                      }}
                    >
                      수락
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      style={{ margin: '0.5em' }}
                      onClick={async () => {
                        if (
                          window.confirm('프로젝트 초대를 거절하시겠습니까?')
                        ) {
                          const { status } = await RefuseProject(project.id);
                          if (status === 200) {
                            const invitedProjectResponse = await GetInvitedProjects();
                            setInvitedProjects(
                              await invitedProjectResponse.json(),
                            );
                          }
                        }
                      }}
                    >
                      거절
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* </Link> */}
          </Grid>
        ))
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '50vh' }}
        >
          아직 초대받은 프로젝트가 없어요. 😢
        </Grid>
      )}
    </Grid>
  );
};

const ProjectSetting = ({ match }) => {
  const { userId } = match.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [invitedProjects, setInvitedProjects] = useState([]);

  useEffect(async () => {
    const userProjectsResponse = await GetUserProjects(userId);
    const invitedProjectResponse = await GetInvitedProjects();
    const appliedProjectsResponse = await GetAppliedProjects();

    if (
      userProjectsResponse.status === 200 &&
      invitedProjectResponse.status === 200 &&
      appliedProjectsResponse.status === 200
    ) {
      setUserProjects(await userProjectsResponse.json());
      setInvitedProjects(await invitedProjectResponse.json());
      setAppliedProjects(await appliedProjectsResponse.json());
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>
          <Typography> 프로젝트 설정 페이지를 불러오고 있어요!</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="md" disableGutters>
      <Grid xs={12} container direction="column">
        <Grid xs={12} item style={{ margin: '1em' }}>
          <Typography variant="h6">참여 중</Typography>
          <ParticipatingTeams
            userId={userId}
            projects={userProjects}
            setProjects={setUserProjects}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: '1em', marginRight: '1em', marginTop: '5em' }}
        >
          <Typography variant="h6">가입 신청</Typography>
          <AppliedProjects
            projects={appliedProjects}
            setProjects={setAppliedProjects}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: '1em', marginRight: '1em', marginTop: '4em' }}
        >
          <Typography variant="h6">초대</Typography>
          <InvitedProjects
            userId={userId}
            projects={invitedProjects}
            setUserProjects={setUserProjects}
            setInvitedProjects={setInvitedProjects}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectSetting;
