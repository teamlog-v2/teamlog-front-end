import { Avatar, Box, Button, Card, CircularProgress, Container,
     Divider, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GetTeam, GetTeamMembers, GetTeamApplcants, GetTeamInvitees,
    AcceptTeam, RefuseTeam, DeleteTeam, KickOutTeamMember } from './TeamApi';
import TeamIntroduction from './TeamIntroeuction';
import MasterSelect from './MasterSelect';
import InviteesSelect from './InviteesSelect';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import AuthContext from '../contexts/auth';
import TeamUpdateForm from './TeamUpdateForm';
// import TeamUpdateForm from '../team/TeamUpdateForm';

const useStyles = makeStyles(() => ({
    profileImg: {
      margin: '10px',
      width: '60px',
      height: '60px',
    },
}));

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

const TeamManagement = (props) => {
    const { setType } = props;
    setType('TEAM');
    const [userId] = useContext(AuthContext); // 유저 정보
    const { teamId } = useParams();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [team, setTeam] = useState(); // 팀
    const [members, setMembers] = useState([]); // 멤버
    const [isTeamUpdatFormOpened, setIsTeamUpdatFormOpened] = useState(false); // 팀 수정 폼 띄울지 여부

    useEffect(async () => {
        const teamResponse = await GetTeam(teamId);
        const membersResponse = await GetTeamMembers(teamId);

        if (teamResponse.status === 401
            || membersResponse.status === 401) {
            setIsLogin(false);
            return;
        }

        const tempMembers = await membersResponse.json();
        const tempTeam = await teamResponse.json();

        if (userId !== tempTeam.masterId) {
          window.alert('접근 권한이 없습니다.');
          window.location.replace(`/teams/${teamId}`);
          return;
        }

        setTeam(tempTeam);
        setMembers(tempMembers);

        setIsLoaded(true);
    }, []);

    if (!isLogin) {
        return <Redirect to="/login" />;
    }

    return !isLoaded ? (
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
          <Typography> 팀 관리 페이지를 불러오고 있어요! </Typography>
        </Grid>
      </Grid>
    ) : (
      <>
        <Container maxWidth="md" style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Container>
            <Grid container style={{ marginBottom: '2em' }}>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6">팀 정보</Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => { setIsTeamUpdatFormOpened(true); }}
                >수정
                </Button>
                <ResponsiveDialog
                  open={isTeamUpdatFormOpened}
                  updateOpen={setIsTeamUpdatFormOpened}
                >
                  <TeamUpdateForm updateOpen={setIsTeamUpdatFormOpened} team={team} />
                </ResponsiveDialog>
              </Grid>
              <Grid item>
                <TeamIntroduction
                  masterId={team.masterId}
                  createTime={team.createTime}
                  followerCount={team.followerCount}
                  memberCount={members.length}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: '2em' }}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6" style={{ color: 'rgb(220, 0, 78)' }}>
                  팀 삭제
                </Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <DeleteButton
                  fullWidth
                  onClick={async () => {
                    if (window.confirm('팀 내의 내용은 모두 사라집니다. 정말 그래도 삭제하시겠습니까?')) {
                        const { status } = await DeleteTeam(teamId);
                        console.log(status);

                        if (status === 401) {
                            setIsLogin(false);
                            return;
                        }

                        if (status === 200) {
                          window.location.replace(`/users/${team.masterId}`);
                        }
                    }
                }}
                >
                  삭제
                </DeleteButton>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </>
);
};

export default TeamManagement;
