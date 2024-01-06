import {
  CheckBox,
  CheckBoxOutlineBlank,
  Search
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { React, useEffect, useState } from 'react';
import { convertResourceUrl } from '../utils';

const StyledList = withStyles({
  root: {
    height: 256,
    overflow: 'auto',
  },
})(List);

const UserSelect = ({
  projectId,
  selectedUsers,
  setSelectedUsers,
  handleClose,
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    (async () => {
      console.log('너니?');
      console.log(selectedUsers);
      let result;
      try {
        const response = await fetch(`/api/projects/${projectId}/members`, {
          method: 'Get',
          headers: { 'Content-Type': 'application/json' },
        });
        result = await response.json();
      } catch (e) {
        setIsLoaded(false);
        return;
      }
      setUsers(result);
      setSelectedUserIds(selectedUsers);
      setIsLoaded(true);
    })();
  }, []);

  if (error) {
    return `Error: ${error.message}`;
  }

  if (!isLoaded) {
    return 'Loading...';
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

  const saveSelectedUsers = () => {
    const selectedUsersToSave = [];
    selectedUserIds.foreach((selectedUserId) => {
      const temp = users.find((user) => user.id === selectedUserId);
      selectedUsersToSave.push(temp);
    });
    setSelectedUsers(selectedUsersToSave);
    handleClose();
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
          <Typography color="primary">{'-'}</Typography>
        )}
        {selectedUserIds.map((selectedUserId) => {
          const user = users.find((u) => u.id === selectedUserId);
          return (
            <Chip
              key={user.id}
              label={`${user.name} (${user.id})`}
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
              <ListItemText primary={`${user.name} (${user.id})`} />
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
        <Button variant="outlined" onClick={saveSelectedUsers}>
          완료
        </Button>
        <Button onClick={handleClose} variant="outlined">
          취소
        </Button>
      </Box>
    </Container>
  );
};

export default UserSelect;
