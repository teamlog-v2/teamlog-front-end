import { Box, Button, Card, CircularProgress, Container, Grid, Typography, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ManufactureDate } from '../post-management/datetime';
import { GetUserTeams, GetInvitedTeams, GetAppliedTeams, KickOutTeamMember, AcceptTeam, RefuseTeam, LeaveTeam, CancelApplyTeam } from './TeamApi';
import AuthContext from '../contexts/auth';

const DeleteButton = withStyles({
  root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      color: 'white',
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'rgb(220, 0, 78)',
      borderColor: 'rgb(220, 0, 78)',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: 'rgb(162, 0, 56)',
        borderColor: 'rgb(162, 0, 56)',
        boxShadow: '-0.05em 0.05em 0.2em 0.1em rgba(0, 0, 0, 0.3)',
      },
      '&:active': {
        backgroundColor: 'rgb(162, 0, 56)',
        borderColor: 'rgb(162, 0, 56)',
        boxShadow: '-0.05em 0.05em 0.2em 0.1em rgba(0, 0, 0, 0.3)',
      },
    },
})(Button);

const ParticipatingTeams = ({ userId, teams, setTeams }) => {
  const history = useHistory();
    return (
      <Grid container spacing={1}>
        {teams.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: '20vh' }}
          >
            아직 참여 중인 팀이 없어요. 😢
          </Grid>
  ) : (teams.map((team) => (
    <Grid key={team.id} item sm={6} xs={12}>
      <Card elevation={2}>
        <Grid container style={{ padding: '0.6em' }}>
          <Grid item xs={9}>
            <Link to={`/teams/${team.id}/project`} style={{ textDecoration: 'none' }}>
              <Grid item container xs={12}>
                <Grid container item xs={12}>
                  <Typography color="textPrimary" noWrap style={{ marginTop: '0.5em' }}>
                    {team.name}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid container item xs={3} spacing={1} justify="flex-end" alignItems="center">
            <Grid item>
              {userId === team.masterId
              ? (
                <Button
                  color="primary"
                  variant="contained"
                  justify="flex-end"
                  alignItems="center"
                  onClick={() => { history.push(`/teams/${team.id}/teammanagement`); }}
                >
                  관리
                </Button>
)
              : (
                <DeleteButton
                  color="primary"
                  variant="contained"
                  justify="flex-end"
                  alignItems="center"
                  onClick={async () => {
                if (window.confirm('정말로 팀을 탈퇴하시겠습니까?')) {
                    const { status } = await LeaveTeam(team.id, userId);
                    if (status === 200) {
                        const userTeamsResponse = await GetUserTeams(userId);
                        setTeams(await userTeamsResponse.json());
                    }
                }
            }}
                >
                  탈퇴
                </DeleteButton>
)}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
        )))}
      </Grid>
    );
};

const AppliedTeams = ({ teams, setTeams }) => {
    console.log(teams);
    // teamId가 null로 오는 상황...
    return (
      <Grid container spacing={1}>
        {teams.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: '20vh' }}
          >
            가입 신청하신 팀이 없어요. 😢
          </Grid>
      ) : (teams.map((team) => (
        <Grid key={team.id} item sm={6} xs={12}>
          <Card elevation={2}>
            <Grid container style={{ padding: '0.6em' }}>
              <Grid item xs={9}>
                <Link to={`/teams/${team.teamId}/project`} style={{ textDecoration: 'none' }}>
                  <Grid item container xs={12}>
                    <Grid container item xs={12} alignItems="center">
                      <Typography color="textPrimary" noWrap style={{ marginTop: '0.5em' }}>
                        {team.teamName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid container item xs={3} spacing={1} justify="flex-end" alignItems="center">
                <Grid item>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={async () => {
                        if (window.confirm('팀 신청을 취소하시겠습니까?')) {
                            const { status } = await CancelApplyTeam(team.id);
                            if (status === 200) {
                                const appliedTeamsResponse = await GetAppliedTeams();
                                setTeams(await appliedTeamsResponse.json());
                            }
                        }
                    }}
                  >
                    취소
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>

        </Grid>
            )))}
      </Grid>
        );
};

const InvitedTeams = ({ teams, userId, setUserTeams, setInvitedTeams }) => {
    return (
      <Grid container spacing={1}>
        {teams.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: '20vh' }}
          >
            초대받은 팀이 없어요. 😢
          </Grid>
    ) : (teams.map((team) => (
      <Grid key={team.id} item sm={6} xs={12}>
        <Card elevation={2}>
          <Grid container style={{ padding: '0.6em' }}>
            <Grid container item xs={7} alignItems="center">
              <Link to={`/teams/${team.teamId}/project`} style={{ textDecoration: 'none' }}>
                <Grid item container xs={5}>
                  <Typography color="textPrimary" noWrap style={{ marginTop: '0.5em' }}>
                    {team.teamName}
                  </Typography>
                </Grid>
              </Link>
            </Grid>
            <Grid container item xs={5} spacing={1} justify="flex-end" alignItems="center">
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={async () => {
                        if (window.confirm('팀 초대를 수락하시겠습니까?')) {
                            const { status } = await AcceptTeam(team.id);
                            console.log(status);
                            if (status === 201) {
                                const userTeamsResponse = await GetUserTeams(userId);
                                const invitedTeamResponse = await GetInvitedTeams();

                                if (userTeamsResponse.status === 200
                                    && invitedTeamResponse.status === 200) {
                                       setUserTeams(await userTeamsResponse.json());
                                       setInvitedTeams(await invitedTeamResponse.json());
                                }
                            }
                        }
                    }}
                >
                  수락
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={async () => {
                    if (window.confirm('팀 초대를 거절하시겠습니까?')) {
                        const { status } = await RefuseTeam(team.id);
                        console.log(status);
                        if (status === 200) {
                            const invitedTeamResponse = await GetInvitedTeams();

                            if (invitedTeamResponse.status === 200) {
                                   setInvitedTeams(await invitedTeamResponse.json());
                            }
                        }
                    }
                }}
                >
                  거절
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
          )))}
      </Grid>
      );
};

const TeamSetting = ({ match }) => {
    const { userId } = match.params;
    const [isLoaded, setIsLoaded] = useState(false);
    const [userTeams, setUserTeams] = useState([]);
    const [appliedTeams, setAppliedTeams] = useState([]);
    const [invitedTeams, setInvitedTeams] = useState([]);

    useEffect(async () => {
        const userTeamsResponse = await GetUserTeams(userId);
        const invitedTeamResponse = await GetInvitedTeams();
        const appliedTeamsResponse = await GetAppliedTeams();

        if (userTeamsResponse.status === 200
            && invitedTeamResponse.status === 200
            && appliedTeamsResponse.status === 200) {
            setUserTeams(await userTeamsResponse.json());
            setInvitedTeams(await invitedTeamResponse.json());
            setAppliedTeams(await appliedTeamsResponse.json());
            setIsLoaded(true);
        }
    }, []);

    console.log(userTeams);
    if (!isLoaded) {
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: '80vh' }}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography> 팀 설정 페이지를 불러오고 있어요!</Typography>
            </Grid>
          </Grid>
);
    }

    return (
      <Container maxWidth="md">
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="h6">참여 중</Typography>
            <ParticipatingTeams userId={userId} teams={userTeams} setTeams={setUserTeams} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '5em' }}>
            <Typography variant="h6">가입 신청</Typography>
            <AppliedTeams teams={appliedTeams} setTeams={setAppliedTeams} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '5em' }}>
            <Typography variant="h6">초대</Typography>
            <InvitedTeams
              teams={invitedTeams}
              userId={userId}
              setUserTeams={setUserTeams}
              setInvitedTeams={setInvitedTeams}
            />
          </Grid>
        </Grid>
      </Container>
    );
};

export default TeamSetting;
