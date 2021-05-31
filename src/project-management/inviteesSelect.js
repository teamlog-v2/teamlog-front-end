import {
    Avatar,
    Box,
    Button,
    Chip,
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
  import React, { useContext, useEffect, useState } from 'react';
import { GetProjectInvitees, JoinProject, InviteProjectNotification } from './projectapi';
import { convertResourceUrl } from '../utils';
import AuthContext from '../contexts/auth';

  const StyledList = withStyles({
    root: {
      height: 256,
      overflow: 'auto',
    },
  })(List);

  const useStyles = makeStyles((theme) => ({
    usersContainer: {
      [theme.breakpoints.up('md')]: {
        width: '20em',
        height: '32em',
        margin: '1em 0',
      },
    },
  }));

  const InviteesSelect = ({
    invitees,
    projectId,
    setInvitees,
    handleClose,
  }) => {
    const classes = useStyles();
    const [masterId] = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [searchString, setSearchString] = useState('');
    console.log(setError);
    console.log('hello');

    useEffect(() => {
      (async () => {
        let result;
        try {
          const response = await fetch(`/api/projects/${projectId}/not-members`, {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
          });
          result = await response.json();
        } catch (e) {
          setIsLoaded(false);
          return;
        }
        setUsers(result);
        setIsLoaded(true);
      })();
    }, []);

    if (error) {
      return `Error: ${error.message}`;
    }

    if (!isLoaded) {
      return (
        <Container style={{ minWidth: '20em', height: '32em', margin: '1em 0' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: '32em' }}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography> 유저 목록을 불러오고 있어요!</Typography>
            </Grid>
          </Grid>
        </Container>
);
    }

    const toggleSelectedUserId = (userId) => {
      if (selectedUserIds.includes(userId)) {
        const temp = selectedUserIds.slice();
        temp.splice(selectedUserIds.indexOf(userId), 1);
        setSelectedUserIds(temp);
      } else {
        setSelectedUserIds([...selectedUserIds, userId]);
      }
    };

    const saveSelectedUsers = async () => {
      const selectedInvitees = [];
      const invitedUserIds = [];
      selectedUserIds.map((selectedUserId) => {
        const temp = users.find((user) => user.id === selectedUserId);
        selectedInvitees.push(temp);
      });
      selectedInvitees.map(async (invitee) => {
        invitedUserIds.push(invitee.id);
        const response = await JoinProject(projectId, invitee.id);
        if (response.status !== 201) {
          window.alert('error');
        }
      });

      console.log('okay');
      InviteProjectNotification(projectId, masterId, invitedUserIds);

      const inviteesResponse = await GetProjectInvitees(projectId);
      if (inviteesResponse.status === 200) {
        const newInvitees = await inviteesResponse.json();
        setInvitees(newInvitees);
        handleClose();
      }
    };

    return (
      <Container className={classes.usersContainer}>
        <Box display="flex" justifyContent="center">
          <Typography>{`${selectedUserIds.length}명 선택됨`}</Typography>
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
          bgcolor="#F8F8F8"
        >
          {selectedUserIds.length === 0 && (
            <Typography color="primary">-</Typography>
          )}
          {selectedUserIds.map((selectedUserId) => {
            const user = users.find((userItem) => userItem.id === selectedUserId);
            return (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => {
                  toggleSelectedUserId(user.id);
                }}
                color="primary"
              />
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
                  <Avatar alt={user.name} src={convertResourceUrl(user.profileImgPath)} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                {selectedUserIds.includes(user.id) ? (
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
            완료
          </Button>
          <Button onClick={handleClose} variant="contained">
            취소
          </Button>
        </Box>
      </Container>
    );
  };

  export default InviteesSelect;
