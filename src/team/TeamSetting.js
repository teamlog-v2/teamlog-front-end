import { Box, Button, Card, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ManufactureDate } from '../post-management/datetime';
import { GetUserTeams, GetInvitedTeams, GetAppliedTeams, KickOutTeamMember, AcceptTeam, RefuseTeam, LeaveTeam } from './TeamApi';
import teamIcon from './team.png';
import AuthContext from '../contexts/auth';

const ParticipatingTeams = ({ userId, teams, setTeams }) => {
    return (
      <Grid container spacing={1}>
        {teams.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: '50vh' }}
          >
            아직 참여 중인 팀이 없어요. 😢
          </Grid>
  ) : (teams.map((team) => (
    <Grid key={team.id} item sm={6} xs={12}>
      <Card elevation={2}>
        <Grid container>
          <Grid item xs={9}>
            <Link to={`/teams/${team.id}/project`} style={{ textDecoration: 'none' }}>
              <Grid item container xs={12}>
                <Grid container item padding="0.5em" xs={2} justify="center" alignItems="center" style={{ margin: '0.5em' }}>
                  <img src={teamIcon} alt="teamIcon" width="40px" height="40px" />
                </Grid>
                <Grid container item margin="0.5rem 0.75rem" xs={9} alignItems="center">
                  <Typography color="textPrimary" noWrap>
                    {team.name}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid container item xs={3} spacing={1} justify="flex-end" alignItems="center">
            <Grid item>
              <Button
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

const AppliedTeams = ({ teams }) => {
    console.log(teams);
    // teamId가 null로 오는 상황...
    return (
      <Grid container spacing={1}>
        {teams.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            가입 신청하신 팀이 없어요. 😢
          </Grid>
      ) : (teams.map((team) => (
        <Grid key={team.id} item sm={6} xs={12}>
          <Card elevation={2}>
            <Grid container>
              <Grid item xs={9}>
                <Link to={`/teams/${team.id}/project`} style={{ textDecoration: 'none' }}>
                  <Grid item container xs={12}>
                    <Grid container item padding="0.5em" xs={2} justify="center" alignItems="center" style={{ margin: '0.5em' }}>
                      <img src={teamIcon} alt="teamIcon" width="40px" height="40px" />
                    </Grid>
                    <Grid container item margin="0.5rem 0.75rem" xs={9} alignItems="center">
                      <Typography color="textPrimary" noWrap>
                        {team.teamName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid container item xs={3} spacing={1} justify="flex-end" alignItems="center">
                <Grid item>
                  <Button color="primary" variant="outlined">취소</Button>
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
          >
            초대받은 팀이 없어요. 😢
          </Grid>
    ) : (teams.map((team) => (
      <Grid key={team.id} item sm={6} xs={12}>
        <Card elevation={2}>
          <Grid container>
            <Grid item xs={7}>
              <Link to={`/teams/${team.id}/project`} style={{ textDecoration: 'none' }}>
                <Grid item container xs={12}>
                  <Grid container item padding="0.5em" xs={2} justify="center" alignItems="center" style={{ margin: '0.5em' }}>
                    <img src={teamIcon} alt="teamIcon" width="40px" height="40px" />
                  </Grid>
                  <Grid container item margin="0.5rem 0.75rem" xs={9} alignItems="center">
                    <Typography color="textPrimary" noWrap>
                      {team.teamName}
                    </Typography>
                  </Grid>
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
    const [appliedTeams, setAppliedTeam] = useState([]);
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
            setAppliedTeam(await appliedTeamsResponse.json());
            setIsLoaded(true);
        }
    }, []);

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
      <Container maxWidth="md" disableGutters>
        <Grid container direction="column" style={{ marginLeft: '1em' }}>
          <Grid item>
            <Typography variant="h5">참여 중</Typography>
            <ParticipatingTeams userId={userId} teams={userTeams} setTeams={setUserTeams} />
          </Grid>
          <Grid item style={{ marginTop: '5em' }}>
            <Typography variant="h5">가입 신청</Typography>
            <AppliedTeams teams={appliedTeams} />
          </Grid>
          <Grid item style={{ marginTop: '5em' }}>
            <Typography variant="h5">초대</Typography>
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
