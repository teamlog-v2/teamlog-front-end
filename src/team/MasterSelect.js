import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
    withStyles,
  } from '@material-ui/core';
  import {
    CheckBox,
    CheckBoxOutlineBlank,
    Search,
  } from '@material-ui/icons';
  import React, { useEffect, useState } from 'react';
import { DelegateTeamMaster } from './TeamApi';

const useStyles = makeStyles((theme) => ({
  frame: {
    [theme.breakpoints.up('md')]: {
      width: '20em',
    },
  },
}));

  const StyledList = withStyles({
    root: {
      height: 256,
      overflow: 'auto',
    },
  })(List);

  const MasterSelect = ({
    teamId,
    currentMaster,
    setCurrentMaster,
    handleClose,
  }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedMaster, setSelectedMaster] = useState([]);
    const [searchString, setSearchString] = useState('');
    console.log(setError);

    const classes = useStyles();

    useEffect(() => {
      (async () => {
        let result;
        try {
          const response = await fetch(`/api/teams/${teamId}/members`, {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
          });
          result = await response.json();
        } catch (e) {
          setIsLoaded(false);
          return;
        }
        setUsers(result);
        setSelectedMaster(currentMaster);
        setIsLoaded(true);
      })();
    }, []);

    if (error) {
      return `Error: ${error.message}`;
    }

    if (!isLoaded) {
      return (
        <Container className={classes.frame} style={{ minWidth: '20em', height: '32em', margin: '1em 0' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: '32em', margin: '1em 0' }}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography> 멤버 목록을 불러오고 있어요!</Typography>
            </Grid>
          </Grid>
        </Container>
      );
    }

    const toggleSelectedUserId = (userId) => {
      if (selectedMaster.includes(userId)) {
        setSelectedMaster(currentMaster);
      } else {
        setSelectedMaster([userId]);
      }
    };

    const saveSelectedUsers = async () => {
      if (window.confirm('정말로 마스터를 위임하시겠습니까?')) {
        const selectedMasterId = selectedMaster[0];
        const newMaster = users.find((user) => user.id === selectedMasterId);

        const response = await DelegateTeamMaster(teamId, newMaster.id);
        if (response.status === 200) {
            console.log('ok');
            setCurrentMaster(newMaster);
            window.location.replace(`/teams/${teamId}`);
        }
      }
    };

    return (
      <Container style={{ minWidth: '20em', height: '32em', margin: '1em 0' }}>
        <Box display="flex" justifyContent="center">
          <Typography>선택된 마스터</Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gridGap="4px"
          height="128px"
          overflow="auto"
          bgcolor="white"
        >
          {selectedMaster.length === 0 && (
            <Typography color="primary">-</Typography>
          )}
          {selectedMaster.map((selectedUserId) => {
            const user = users.find((master) => master.id === selectedUserId);
            return (
              <>
                <ListItem style={{ backgroundColor: 'white' }}>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.profileImgPath} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />

                </ListItem>
              </>
            );
          })}
        </Box>

        <TextField
          fullWidth
          type="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="이름으로 검색"
          value={searchString}
          onChange={(event) => {
            setSearchString(event.target.value);
          }}
        />

        <StyledList dense>
          {users
            .filter((user) => user.name.includes(searchString))
            .map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => {
                  toggleSelectedUserId(user.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.profileImgPath} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                {selectedMaster.includes(user.id) ? (
                  <CheckBox color="primary" />
                ) : (
                  <CheckBoxOutlineBlank color="primary" />
                )}
              </ListItem>
            ))}
        </StyledList>

        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gridGap="8px"
          padding="8px"
          bgcolor="#F8F8F8"
        >
          <Button variant="contained" color="primary" onClick={saveSelectedUsers}>
            확인
          </Button>
          <Button onClick={handleClose} variant="contained">
            취소
          </Button>
        </Box>
      </Container>
    );
  };

  export default MasterSelect;
