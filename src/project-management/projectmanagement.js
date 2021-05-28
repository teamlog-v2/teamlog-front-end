import { Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import ProjectUpdateForm from '../project/ProjectUpdateForm';
import Introduction from './introduction';
import TeamSelect from '../team/TeamSelect';
import { GetProject } from './projectapi';

const ProjectManagement = ({ match }) => {
    const [userId] = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const { projectId } = match.params;
    const [isLogin, setIsLogin] = useState(true);
    const [isProjectUpdatFormOpened, setIsProjectUpdatFormOpened] = useState(false);
    const [isTeamSelectOpened, setIsTeamSelectOpened] = useState(false);
    const [project, setProject] = useState(); // 프로젝트

    useEffect(async () => {
        const projectResponse = await GetProject(projectId);

        if (projectResponse.status === 401) {
            setIsLogin(false);
            return;
        }
        setProject(await projectResponse.json());
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

    console.log(project);

    return (
      <Container>
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
              masterUserId={project.masterId}
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
              <TeamSelect updateOpen={setIsProjectUpdatFormOpened} project={project} />
            </ResponsiveDialog>
          </Grid>
        </Grid>
      </Container>
);
};

export default ProjectManagement;
