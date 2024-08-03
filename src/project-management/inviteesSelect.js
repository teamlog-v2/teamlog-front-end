import {
  CheckBox,
  CheckBoxOutlineBlank,
  Search,
} from '@mui/icons-material';
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
  Typography
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/auth';
import { convertResourceUrl } from '../utils';
import { GetProjectInvitees, InviteProjectNotification, JoinProject } from './project-api';

const StyledList = withStyles({
  root: {
    height: 256,
    overflow: 'auto',
  },
})(List);

const useStyles = makeStyles((theme) => ({
  accountsContainer: {
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
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [searchString, setSearchString] = useState('');
  console.log(setError);
  console.log('hello');

  useEffect(() => {
    (async () => {
      let result;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/not-members`, {
          method: 'Get',
          headers: { 'Content-Type': 'application/json' },
        });
        result = await response.json();
      } catch (e) {
        setIsLoaded(false);
        return;
      }
      setAccounts(result);
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

  const toggleSelectedAccountId = (accountId) => {
    if (selectedAccountIds.includes(accountId)) {
      const temp = selectedAccountIds.slice();
      temp.splice(selectedAccountIds.indexOf(accountId), 1);
      setSelectedAccountIds(temp);
    } else {
      setSelectedAccountIds([...selectedAccountIds, accountId]);
    }
  };

  const saveSelectedAccounts = async () => {
    const selectedInvitees = [];
    const invitedAccountIds = [];
    selectedAccountIds.foreach((selectedAccountId) => {
      const temp = accounts.find((account) => account.id === selectedAccountId);
      selectedInvitees.push(temp);
    });
    selectedInvitees.map(async (invitee) => {
      invitedAccountIds.push(invitee.id);
      const response = await JoinProject(projectId, invitee.id);
      if (response.status !== 201) {
        window.alert('error');
      }
    });

    console.log('okay');
    InviteProjectNotification(projectId, masterId, invitedAccountIds);

    const inviteesResponse = await GetProjectInvitees(projectId);
    if (inviteesResponse.status === 200) {
      const newInvitees = await inviteesResponse.json();
      setInvitees(newInvitees);
      handleClose();
    }
  };

  return (
    <Container className={classes.accountsContainer}>
      <Box display="flex" justifyContent="center">
        <Typography>{`${selectedAccountIds.length}명 선택됨`}</Typography>
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
        {selectedAccountIds.length === 0 && (
          <Typography color="primary">-</Typography>
        )}
        {selectedAccountIds.map((selectedAccountId) => {
          const account = accounts.find((accountItem) => accountItem.id === selectedAccountId);
          return (
            <Chip
              key={account.id}
              label={account.name}
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
        <Button variant="contained" color="primary" onClick={saveSelectedAccounts}>
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
