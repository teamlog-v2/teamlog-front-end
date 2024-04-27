import { Skeleton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertResourceUrl } from '../utils';
import { follow, unfollow } from './AccountService';

const useStyles = makeStyles(() => ({
  profileImg: {
    margin: '10px',
    width: '60px',
    height: '60px',
  },
}));

const AccountList = ({ type, accountId, fetchData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let result;
      try {
        const response = await fetchData(accountId);
        result = await response.json();
      } catch (e) {
        setIsLoaded(false);
        return;
      }
      setAccounts(result);
      setIsLoaded(true);
    })();
  }, []);

  const followAccount = (target) => {
    const newAccounts = accounts.map((account) => (account.identification === target.identification ? { ...account, isFollow: true }
      : account));
    let result = null;

    const response = follow(target.identification);
    result = response.json();

    setAccounts(newAccounts);
  };

  const unfollowAccount = (target) => {
    const newAccounts = accounts.map((account) => (account.identification === target.identification ? { ...account, isFollow: false }
      : account));
    let result = null;

    const response = unfollow(target.identification);
    result = response.json();

    setAccounts(newAccounts);
  };

  return (
    <Container disableGutters maxWidth="md">
      <Grid container spacing={1}>
        {isLoaded ?
          (
            <>
              {accounts.length > 0 ?
                accounts.map(((account) => (
                  <Grid item sm={6} xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Link
                            to={`/accounts/${account.identification}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar
                                className={classes.profileImg}
                                src={convertResourceUrl(account.profileImgPath)}
                              />
                              <Typography variant="body1" color="textPrimary">
                                {account.name}
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                        <Box margin="10px" display="flex" alignItems="center">
                          {account.isFollow === null ? null : (
                            <>
                              {account.isFollow === true ? (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => unfollowAccount(account)}
                                >
                                  팔로잉
                                </Button>
                              ) : (
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => followAccount(account)}
                                >
                                  팔로우
                                </Button>
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                )
                )) : (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ height: '50vh' }}
                  >
                    {type === 'FOLLOWER' ? (<>아직 팔로워가 없어요. 😢</>) : (<>아직 팔로우하는 유저가 없어요. 😢</>)}
                  </Grid>
                )}
            </>
          )
          : Array.from(new Array(12)).map(() => (
            <Grid item sm={6} xs={12}>
              <Card elevation={2}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Skeleton variant="circle" className={classes.profileImg} />
                  <Skeleton width="50%" height={20} />
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default AccountList;
