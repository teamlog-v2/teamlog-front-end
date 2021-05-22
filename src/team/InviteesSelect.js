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
import { GetTeamInvitees, JoinTeam } from './TeamApi';

  const StyledList = withStyles({
    root: {
      height: 256,
      overflow: 'auto',
    },
  })(List);

  const InviteesSelect = ({
    invitees,
    teamId,
    setInvitees,
    handleClose,
  }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [searchString, setSearchString] = useState('');
    console.log(setError);

    useEffect(() => {
      (async () => {
        let result;
        try {
          const response = await fetch(`/api/teams/${teamId}/not-members`, {
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
            <Typography> 유저 목록을 불러오고 있어요!</Typography>
          </Grid>
        </Grid>
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
      selectedUserIds.map((selectedUserId) => {
        const temp = users.find((user) => user.id === selectedUserId);
        selectedInvitees.push(temp);
      });
      selectedInvitees.map(async (invitee) => {
        const response = await JoinTeam(teamId, invitee.id);
        if (response.status !== 201) {
          window.alert('error');
        }
      });

      const inviteesResponse = await GetTeamInvitees(teamId);
      if (inviteesResponse.status === 200) {
        const newInvitees = await inviteesResponse.json();
        setInvitees(newInvitees);
        handleClose();
      }
    };

    return (
      <Container minWidth="sm">
        <Box display="flex" justifyContent="center">
          <Typography>{`${selectedUserIds.length}명 선택됨`}</Typography>
        </Box>

        <Box
          width="23vw"
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
                  <Avatar alt={user.name} src={user.profileImgPath} />
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
