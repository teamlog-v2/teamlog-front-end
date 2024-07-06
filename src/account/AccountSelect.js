import {
  CheckBox,
  CheckBoxOutlineBlank,
  Search
} from '@mui/icons-material';
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
  TextField,
  Typography
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/members`, {
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
    setSelectedAccounts(selectedAccountIds.map((selectedAccountId) => accounts.find((account) => account.id === selectedAccountId)));

    handleClose();
  };

  const sliceSize = 4;

  return (
    <Container minWidth="sm">
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gridGap="4px"
        height="128px"
        overflow="auto"
        bgcolor="#F8F8F8"
      >
        <Box display="flex" flexDirection="row">
          {selectedAccountIds.slice(0, sliceSize).map((accountId, index) => {
            const account = accounts.find((u) => u.id === accountId);

            return (
              <Box key={index} paddingLeft="5px" paddingRight="5px">
                <Avatar
                  alt={account.name}
                  src={convertResourceUrl(account.profileImgPath)}
                />
                <Typography variant="caption">{account.name}</Typography>
              </Box>
            )
          })}
          {selectedAccountIds.length > sliceSize && (
            <Box paddingLeft="5px" paddingRight="5px">
              <Avatar>+{selectedAccountIds.length - sliceSize}</Avatar>
            </Box>
          )}
        </Box>
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
        }}
      />

      <StyledList dense>
        {!isLoaded ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box> :
          accounts
            .filter((account) => account.name.includes(searchString))
            .map((account) => (
              <ListItem
                key={account.id}
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
        alignItems="center"
        justifyContent="center"
        padding="8px"
        bgcolor="#F8F8F8"
      >
        <Grid container md={12} margin="0.5em">
          <Grid item md={6} alignItems={"center"} display="flex" justifyContent="center">
            <Button variant="contained" display="flex" onClick={saveSelectedAccounts}>
              확인
            </Button>
          </Grid>
          <Grid item md={6} display="flex" justifyContent="center">
            <Button onClick={handleClose} variant="outlined">
              취소
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container >
  );
};

export default AccountSelect;
