import { Avatar, Box, Button, Card, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    profileImg: {
        margin: '10px',
        width: '60px',
        height: '60px',
      },
  }));

const LikerList = ({ likerList }) => {
    const classes = useStyles();

    return likerList.length > 0 ? (
      <Container>
        <Grid container xs={12}>
          <Grid item style={{ margin: '1em 0' }}>
            <Typography variant="h6">좋아하는 유저들</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '1em' }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            { likerList ? likerList.map((liker) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Link
                            to={`/users/${liker.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar
                                className={classes.profileImg}
                                src={liker.profileImgPath}
                              />
                              <Typography variant="body1" color="textPrimary">
                                {liker.name}
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
              );
          }) : null}
          </Grid>
        </Grid>
      </Container>
    ) : (
      <Container>
        <Grid variant="h6" style={{ marginTop: '1em' }}>
          <Typography>좋아하는 유저들</Typography>
        </Grid>
        <Grid>
          아직 없거든요!?
        </Grid>
      </Container>
    );
};

export default LikerList;
