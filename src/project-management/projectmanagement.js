import { Box, Button, Card, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import ProjectUpdateForm from '../project/ProjectUpdateForm';
import { resizeImage } from '../utils';
import Introduction from './introduction';
import { DeleteProject, GetProject } from './project-api';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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

const ProjectManagement = (props) => {
  const classes = useStyles();
  const { projectId } = useParams();
  const [accountId] = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isProjectUpdatFormOpened, setIsProjectUpdatFormOpened] = useState(false);
  const [isTeamSelectOpened, setIsTeamSelectOpened] = useState(false);
  const [project, setProject] = useState(); // 프로젝트
  const [team, setTeam] = useState(null);

  const { setType } = props;
  setType('PROJECT');
  const handleAccountSelectClose = () => {
    setIsTeamSelectOpened(false);
  };

  const thumbnailInput = useRef(null);
  const onChangeThumbnailInput = async (event) => {
    const [file] = event.target.files;

    const formData = new FormData();
    const data = {
      projectId,
    };
    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    const tempURL = URL.createObjectURL(file);
    const resizedImage = await resizeImage(file, tempURL);
    formData.append('thumbnail', resizedImage);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/thumbnail`, {
      method: 'PUT',
      body: formData,
    });

    if (res.status >= 200 && res.status < 300) {
      setProject(await (await GetProject(projectId)).json());
    }
  };

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

  return (
    <Container maxWidth="md">
      <Grid container style={{ marginBottom: '2em' }}>
        <Grid item xs={9} sm={10}>
          <Typography variant="h6">프로젝트 대표 이미지</Typography>
        </Grid>
        <Grid item style={{ marginTop: '1em', marginBottom: '4em' }}>
          <Card style={{ marginRight: '1rem' }}>
            <CardMedia
              style={{ width: 200, height: 120 }}
              image={project.thumbnail}
            />
            <Button
              onClick={() => {
                thumbnailInput.current.click();
              }}
              fullWidth
            >
              변경하기
            </Button>
            <Box display="none">
              <input
                type="file"
                accept="image/*"
                ref={thumbnailInput}
                onChange={onChangeThumbnailInput}
              />
            </Box>
          </Card>
        </Grid>
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
        <Grid item style={{ marginBottom: '2em' }}>
          <Introduction
            masterId={project.masterId}
            createTime={project.createTime}
            followerCount={project.followerCount}
            memberCount={project.memberCount}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
          <Typography variant="h6" style={{ color: 'rgb(220, 0, 78)' }}>
            프로젝트 삭제
          </Typography>
        </Grid>
        <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
          <DeleteButton
            fullWidth
            onClick={async () => {
              if (window.confirm('프로젝트 내의 내용은 모두 사라집니다. 정말 그래도 삭제하시겠습니까?')) {
                const { status } = await DeleteProject(projectId);

                if (status === 401) {
                  setIsLogin(false);
                  return;
                }

                if (status === 200) {
                  window.location.replace(`/accounts/${project.masterId}`);
                }
              }
            }}
          >
            삭제
          </DeleteButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectManagement;
