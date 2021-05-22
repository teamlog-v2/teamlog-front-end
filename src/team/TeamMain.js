import { Box, Button, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { useFetchData } from '../hooks/hooks';
import TeamIntroduction from './TeamIntroeuction';

const useStyles = makeStyles((theme) => ({
    /* 반응형 스타일 */
    root: {
      [theme.breakpoints.down('sm')]: {
        margin: '0 0',
        padding: '0 1%',
      },
      [theme.breakpoints.up('md')]: {
        margin: '0 0',
        padding: '0 15%',
      },
    },
    children: {
      [theme.breakpoints.down('sm')]: {
        margin: '2% 0',
      },
      [theme.breakpoints.up('md')]: {
        margin: '1% 0',
      },
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

export default function TeamPage() {
  const { id } = useParams();
  const classes = useStyles();

  const [team, isTeamLoaded] = useFetchData(`/api/teams/${id}`);

  if (!isTeamLoaded) {
    return (
      <>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <CircularProgress />
        </Grid>
      </>
    );
  }

  // render ========
  // const { masterId, createTime, followerCount, memberCount } = props;
  console.log(team);
  const { name, introduction, masterId, memberCount, accessModifier, createTime } = team;
  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          md={10}
          justify="center"
          direction="column"
          style={{ margin: '0 auto' }}
        >
          <Container className={classes.children} disableGutters>
            <Title title={name} />
            <TeamIntroduction
              masterId={masterId}
              memberCount={memberCount}
              createTime={createTime}
            />
          </Container>
          <Container className={classes.children} disableGutters />
        </Grid>
      </Container>

      <h1>죄송합니다! 팀 페이지는 🚧공사 중🚧입니다.</h1>
    </>
  );
}
