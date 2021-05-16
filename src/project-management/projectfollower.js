import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';

const ProjectFollower = () => {
    const { id: projectId } = useParams();

    const [followers, isFollowersLoaded, followersLoadError] = useFetchData(
        `/api/projects/${projectId}/members`,
    );
    console.log(followers);
    // 프로젝트 팔로워 요청으로 변경 필요

    const { useHandleError } = useContext(ErrorContext);
    useHandleError(followersLoadError);

    if (!isFollowersLoaded) {
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
          <Typography> 팔로워 목록을 불러오고 있어요!</Typography>
        </Grid>
      </Grid>
    );
  }
    return (<div>프로젝트 팔로워 목록</div>);
};

export default ProjectFollower;
