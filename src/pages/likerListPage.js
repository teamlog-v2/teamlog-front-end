import { Close } from '@mui/icons-material';
import { Avatar, Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { convertResourceUrl } from '../utils';

const useStyles = makeStyles(() => ({
    profileImg: {
        margin: '10px',
        width: '60px',
        height: '60px',
      },
  }));

const LikerList = ({ likerList, updateOpen }) => {
    const classes = useStyles();

    return (
      <>
        <Grid container justify="flex-end">
          <Close onClick={() => { updateOpen(false); }} style={{ cursor: 'pointer' }} />
        </Grid>
        {likerList.length > 0 ? (
          <Container>
            <Grid container xs={12} style={{ minWidth: '20em', height: '30em' }}>
              <Grid container direction="column">
                <Grid item style={{ margin: '1em 0' }}>
                  <Typography variant="h6">좋아하는 유저들</Typography>
                </Grid>
                <Grid item style={{ marginBottom: '1em' }}>
                  <Divider />
                </Grid>
                <Grid item>
                  {likerList ? likerList.map((liker) => (
                      <Grid item spacing={3} style={{ margin: '0.25em 0' }}>
                        <Grid item xs={12}>
                          <Card elevation={2}>
                            <Box display="flex" flexDirection="row">
                              <Box flexGrow={1}>
                                <Link
                                  to={`/accounts/${liker.id}`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <Box display="flex" alignItems="center">
                                    <Avatar
                                      className={classes.profileImg}
                                      src={convertResourceUrl(liker.profileImgPath)}
                                    />
                                    <Typography variant="body1" color="textPrimary">
                                      {liker.name}
                                    </Typography>
                                  </Box>
                                </Link>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>
                    )) : null}
                </Grid>
              </Grid>
            </Grid>
          </Container>
          ) : (
            <Container>
              <Grid container xs={12} style={{ minWidth: '20em', height: '30em' }}>
                <Grid container direction="column">
                  <Grid item style={{ margin: '1em 0' }}>
                    <Typography variant="h6">좋아하는 유저들</Typography>
                  </Grid>
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Divider />
                  </Grid>
                  <Grid item>
                    가장 먼저 좋아요를 눌러보세요!
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          )}
      </>
  );
};

export default LikerList;
