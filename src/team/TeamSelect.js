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
import { SetProjectTeam } from '../project-management/projectapi';

// import { DelegateProjectTeam } from './projectapi';

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

  const TeamSelect = ({
    userId,
    projectId,
    currentTeam,
    setCurrentTeam,
    handleClose,
  }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [searchString, setSearchString] = useState('');
    console.log(setError);
    console.log(selectedTeam);

    const classes = useStyles();

    useEffect(() => {
      (async () => {
        let result;
        try {
          const response = await fetch(`/api/teams/user/${userId}`, {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
          });
          result = await response.json();
        } catch (e) {
          setIsLoaded(false);
          return;
        }
        setTeams(result);
        if (currentTeam !== null) {
          setSelectedTeam([currentTeam]);
        }
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
              <Typography> 팀 목록을 불러오고 있어요!</Typography>
            </Grid>
          </Grid>
        </Container>
      );
    }

    const toggleSelectedTeam = (tempTeam) => {
      if (selectedTeam.length > 0 && (selectedTeam[0].id === tempTeam.id)) { // 이미 체크한 것
        if (currentTeam != null) {
          setSelectedTeam([currentTeam]);
        } else {
          setSelectedTeam([]);
        }
      } else { // 체크 안한 것
        setSelectedTeam([tempTeam]);
      }
    };

    const saveSelectedTeam = async () => {
      if (window.confirm('해당 프로젝트에 팀을 설정하시겠습니까?')) {
        const newTeam = teams.find((team) => team.id === selectedTeam[0].id);
        setCurrentTeam(newTeam);
        const response = await SetProjectTeam(projectId, newTeam.id);
        if (response.status === 200) {
            setCurrentTeam(newTeam);
            handleClose(true);
            // window.location.replace(`/projects/${projectId}`);
        }
      }
    };

    return (
      <Container className={classes.frame} style={{ minWidth: '20em', height: '32em', margin: '1em 0' }}>
        <Box display="flex" justifyContent="center">
          <Typography>선택된 팀</Typography>
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
          {selectedTeam.length === 0 && (
            <Typography color="primary">-</Typography>
          )}
          {selectedTeam.map((teamItem) => {
            const selected = teams.find((team) => team.id === teamItem.id);
            console.log(teams);
            console.log(teamItem);
            return (
              <>
                <ListItem>
                  <ListItemText primary={selected.name} />
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
          {teams.length === 0 && (
          <Typography>소속된 팀이 없습니다.</Typography>
          )}
          {teams
            .filter((team) => team.name.includes(searchString))
            .map((team) => (
              <ListItem
                key={team.id}
                button
                onClick={() => {
                  toggleSelectedTeam(team);
                }}
                style={{ margin: '0.5em 0' }}
              >
                <ListItemText primary={team.name} />
                {selectedTeam.length > 0 && (selectedTeam[0].id === team.id) ? (
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
          <Button
            variant="contained"
            color="primary"
            disabled={teams.length === 0 ? true : ''}
            onClick={saveSelectedTeam}
          >
            확인
          </Button>
          <Button onClick={handleClose} variant="contained">
            취소
          </Button>
        </Box>
      </Container>
    );
  };

  export default TeamSelect;
