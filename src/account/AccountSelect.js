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

const AccountSelect = ({
  projectId,
  selectedAccounts,
  setSelectedAccounts,
  handleClose,
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    (async () => {
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
      setAccounts(result);
      setSelectedAccountIds(selectedAccounts);
      setIsLoaded(true);
    })();
  }, []);

  if (error) {
    return `Error: ${error.message}`;
  }

  if (!isLoaded) {
    return 'Loading...';
  }

  const toggleSelectedAccountId = (accountId) => {
    if (selectedAccountIds.includes(accountId)) {
      const temp = selectedAccountIds.slice();
      temp.splice(selectedAccountIds.indexOf(accountId), 1);
      setSelectedAccountIds(temp);
    } else {
      setSelectedAccountIds([...selectedAccountIds, accountId]);
    }
  };

  const saveSelectedAccounts = () => {
    const selectedAccountsToSave = [];
    selectedAccountIds.foreach((selectedAccountId) => {
      const temp = accounts.find((account) => account.id === selectedAccountId);
      selectedAccountsToSave.push(temp);
    });
    setSelectedAccounts(selectedAccountsToSave);
    handleClose();
  };

  return (
    <Container minWidth="sm">
      <Box display="flex" justifyContent="center">
        <Typography>{`${selectedAccountIds.length}명 선택됨`}</Typography>
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
        {selectedAccountIds.length === 0 && (
          <Typography color="primary">{'-'}</Typography>
        )}
        {selectedAccountIds.map((selectedAccountId) => {
          const account = accounts.find((u) => u.id === selectedAccountId);
          return (
            <Chip
              key={account.id}
              label={`${account.name} (${account.id})`}
              onDelete={() => {
                toggleSelectedAccountId(account.id);
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
        {accounts
          .filter((account) => account.name.includes(searchString))
          .map((account) => (
            <ListItem
              key={account.id}
              button
              onClick={() => {
                toggleSelectedAccountId(account.id);
              }}
            >
              <ListItemAvatar>
                <Avatar alt={account.name} src={convertResourceUrl(account.profileImgPath)} />
              </ListItemAvatar>
              <ListItemText primary={`${account.name} (${account.id})`} />
              {selectedAccountIds.includes(account.id) ? (
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
        <Button variant="outlined" onClick={saveSelectedAccounts}>
          완료
        </Button>
        <Button onClick={handleClose} variant="outlined">
          취소
        </Button>
      </Box>
    </Container>
  );
};

export default AccountSelect;
