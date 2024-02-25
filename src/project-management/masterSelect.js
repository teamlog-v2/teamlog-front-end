import {
  CheckBox,
  CheckBoxOutlineBlank,
  Search,
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
import { DelegateProjectMaster, DelegateProjectMasterNotification } from './projectApi';

const StyledList = withStyles({
  root: {
    height: 256,
    overflow: 'auto',
  },
})(List);

const MasterSelect = ({
  projectId,
  currentMaster,
  setCurrentMaster,
  handleClose,
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState([]);
  const [searchString, setSearchString] = useState('');
  console.log(setError);

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
      setSelectedMaster(currentMaster);
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

  const toggleSelectedAccountId = (accountId) => {
    if (selectedMaster.includes(accountId)) {
      setSelectedMaster(currentMaster);
    } else {
      setSelectedMaster([accountId]);
    }
  };

  const saveSelectedAccounts = async () => {
    if (window.confirm('정말로 마스터를 위임하시겠습니까?')) {
      const selectedMasterId = selectedMaster[0];
      const currentMasterId = currentMaster[0];
      const newMaster = accounts.find((account) => account.id === selectedMasterId);

      const response = await DelegateProjectMaster(projectId, newMaster.id);
      if (response.status === 200) {
        DelegateProjectMasterNotification(projectId, currentMasterId, newMaster.id);
        setCurrentMaster(newMaster);
        window.location.replace(`/projects/${projectId}`);
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
        {selectedMaster.map((selectedAccountId) => {
          const account = accounts.find((master) => master.id === selectedAccountId);
          return (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={account.name} src={convertResourceUrl(account.profileImgPath)} />
                </ListItemAvatar>
                <ListItemText primary={`${account.name} (${account.id})`} />

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
              {selectedMaster.includes(account.id) ? (
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
        bgcolor="white"
      >
        <Button variant="contained" color="primary" onClick={saveSelectedAccounts}>
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
