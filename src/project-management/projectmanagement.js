import { Avatar, Box, Button, Card, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import teamIcon from '../team/team.png';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import ProjectUpdateForm from '../project/ProjectUpdateForm';
import Introduction from './introduction';
import TeamSelect from '../team/TeamSelect';
import { GetProject } from './projectapi';
import { GetTeam } from '../team/TeamApi';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ProjectManagement = ({ match }) => {
    const classes = useStyles();
    const [userId] = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const { projectId } = match.params;
    const [isLogin, setIsLogin] = useState(true);
    const [isProjectUpdatFormOpened, setIsProjectUpdatFormOpened] = useState(false);
    const [isTeamSelectOpened, setIsTeamSelectOpened] = useState(false);
    const [project, setProject] = useState(); // 프로젝트
    const [team, setTeam] = useState(null);

  const handleUserSelectClose = () => {
      setIsTeamSelectOpened(false);
  };

    useEffect(async () => {
        const projectResponse = await GetProject(projectId);

        if (projectResponse.status === 401) {
            setIsLogin(false);
            return;
        }

        const tempProject = await projectResponse.json();
        setProject(tempProject);
        if (tempProject.team !== null) {
          setTeam(tempProject.team);
        }
        setIsLoaded(true);
    }, []);

    if (!isLogin) {
        window.location.replace('/login');
    }

    if (!isLoaded) {
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
              <Typography> 프로젝트 설정 페이지를 불러오고 있어요! </Typography>
            </Grid>
          </Grid>
        );
    }

    return (
      <Container maxWidth="md">
        <Grid container style={{ marginBottom: '2em' }}>
          <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
            <Typography variant="h6">프로젝트 정보</Typography>
          </Grid>
          <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => { setIsProjectUpdatFormOpened(true); }}
            >수정
            </Button>
            <ResponsiveDialog
              open={isProjectUpdatFormOpened}
              updateOpen={setIsProjectUpdatFormOpened}
            >
              <ProjectUpdateForm updateOpen={setIsProjectUpdatFormOpened} project={project} />
            </ResponsiveDialog>
          </Grid>
          <Grid item>
            <Introduction
              masterId={project.masterId}
              createTime={project.createTime}
              followerCount={project.followerCount}
              memberCount={project.memberCount}
            />
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: '2em' }}>
          <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
            <Typography variant="h6">프로젝트 관리팀 설정</Typography>
          </Grid>
          <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => { setIsTeamSelectOpened(true); }}
            >설정
            </Button>
            <ResponsiveDialog
              open={isTeamSelectOpened}
              updateOpen={setIsTeamSelectOpened}
            >
              {console.log(team)}
              <TeamSelect
                userId={userId}
                updateOpen={setIsProjectUpdatFormOpened}
                currentTeam={team}
                setCurrentTeam={setTeam}
                projectId={projectId}
                handleClose={handleUserSelectClose}
              />
            </ResponsiveDialog>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {team === null ? (<div>팀 없어요</div>) : (
            <Grid item sm={6} xs={12}>
              <Card elevation={2}>
                <Box display="flex" flexDirection="row">
                  <Box flexGrow={1}>
                    <Link to={`/teams/${team.id}/project`} style={{ textDecoration: 'none' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.profileImg}
                          src={teamIcon}
                          variant="square"
                          style={{ margin: '0.5em' }}
                        />
                        <Typography variant="body1" color="textPrimary">
                          {team.name}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                  <Box margin="10px" display="flex" alignItems="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      삭제
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
      )}
        </Grid>
      </Container>
);
};

export default ProjectManagement;
