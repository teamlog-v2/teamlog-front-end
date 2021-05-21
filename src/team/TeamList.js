import { Box, Card, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFetchData } from '../hooks/hooks';
import { ManufactureDate } from '../post-management/datetime';

export default function TeamList() {
  const { userId } = useParams();

  const [teams, isTeamsLoaded] = useFetchData(`/api/teams/user/${userId}`);

  // render ========
  if (!isTeamsLoaded) {
    return (
      <Grid container spacing={1}>
        {Array.from(new Array(3)).map((_, index) => (
          <Grid key={`skeleton-${index}`} item sm={6} xs={12}>
            <Card>
              <Skeleton variant="rect" height="68px" />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      {teams.map((team) => (
        <Grid key={team.id} item sm={6} xs={12}>
          <Link to={`/teams/${team.id}`} style={{ textDecoration: 'none' }}>
            <Card elevation={2}>
              <Box margin="0.5rem 0.75rem">
                <Typography variant="h6" color="textPrimary">
                  {team.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  마지막 업데이트&nbsp;·&nbsp;
                  {ManufactureDate(team.updateTime)}
                </Typography>
              </Box>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
