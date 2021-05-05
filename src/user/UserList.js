import {
  Avatar,
  Grid,
  Box,
  Typography,
  Card,
  makeStyles,
  Container,
  Button,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  profileImg: {
    margin: '10px',
    width: '60px',
    height: '60px',
  },
}));

const UserList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let result;
      try {
        const response = await fetch('/api/projects/1343/members', {
          method: 'Get',
          headers: { 'Content-Type': 'application/json' },
        });
        result = await response.json();
      } catch (error) {
        setIsLoaded(false);
        return;
      }
      setUsers(result);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        {(isLoaded ? users : Array.from(new Array(12))).map((user) => (
          <Grid item sm={6} xs={12}>
            <Card elevation={2}>
              {user ? (
                <Box display="flex" flexDirection="row">
                  <Box flexGrow={1}>
                    <Link
                      to={`/users/${user.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.profileImg}
                          src={user.profileImgPath}
                        />
                        <Typography variant="body6" color="textPrimary">
                          {user.name}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                  <Box margin="10px" display="flex" alignItems="center">
                    {user.isFollow ? (
                      <Button size="small" variant="outlined" color="primary">
                        언팔로우
                      </Button>
                    ) : (
                      <Button size="small" variant="contained" color="primary">
                        팔로우
                      </Button>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Skeleton variant="circle" className={classes.profileImg} />
                  <Skeleton width="50%" height={20} />
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
