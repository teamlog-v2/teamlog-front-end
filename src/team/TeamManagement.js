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

const TeamManagement = () => {
    const classes = useStyles();
    const [userId] = useContext(AuthContext); // 유저 정보
    const { id: teamId } = useParams();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTeamUpdatFormOpened, setIsTeamUpdatFormOpened] = useState(false);
    const [team, setTeam] = useState(); // 팀
    const [members, setMembers] = useState([]); // 멤버
    const [applicants, setApplicants] = useState([]); // 신청한 유저
    const [invitees, setInvitees] = useState([]); // 초대받은 유저
    const [master, setMaster] = useState([]); // 마스터
    const [openUserSelect, setOpenUserSelect] = useState(false); // 마스터 선택 폼 띄울지 여부
    const [openInviteeSelect, setOpenInviteeSelect] = useState(false);

    useEffect(async () => {
        const teamResponse = await GetTeam(teamId);
        const applicantsResponse = await GetTeamApplcants(teamId);
        const inviteesResponse = await GetTeamInvitees(teamId);
        const membersResponse = await GetTeamMembers(teamId);

        if (teamResponse.status === 401
            || applicantsResponse.status === 401
            || membersResponse.status === 401) {
            setIsLogin(false);
            return;
        }

        const tempMembers = await membersResponse.json();
        const tempTeam = await teamResponse.json();
        const tempApplicants = await applicantsResponse.json();
        const tempInvitees = await inviteesResponse.json();

        if (userId !== tempTeam.masterId) {
          window.alert('접근 권한이 없습니다.');
          window.location.replace(`/teams/${teamId}`);
          return;
        }

        setTeam(tempTeam);
        setMembers(tempMembers);
        setApplicants(tempApplicants);
        setInvitees(tempInvitees);

        const tempMaster = tempMembers.filter((user) => user.id === tempTeam.masterId);
        setMaster(tempMaster[0]);
        setIsLoaded(true);
    }, []);

    if (!isLogin) {
        return <Redirect to="/login" />;
    }

    const handleUserSelectOpen = () => {
        setOpenUserSelect(true);
      };

    const handleUserSelectClose = () => {
        setOpenUserSelect(false);
    };

    const handleInviteeSelectOpen = () => {
        setOpenInviteeSelect(true);
    };

    const handleInviteeSelectClose = () => {
        setOpenInviteeSelect(false);
    };

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
          <Typography> 팀 설정 페이지를 불러오고 있어요! </Typography>
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
                  <TeamUpdateForm team={team} />
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
            <Grid container style={{ marginBottom: '2em' }}>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6">초대한 멤버</Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleInviteeSelectOpen}
                >초대
                </Button>
                <ResponsiveDialog open={openInviteeSelect} updateOpen={setOpenInviteeSelect}>
                  <InviteesSelect
                    teamId={team.id}
                    invitees={invitees}
                    setInvitees={setInvitees}
                    handleClose={handleInviteeSelectClose}
                  />
                </ResponsiveDialog>
              </Grid>
              <Grid container spacing={2}>
                {invitees.length > 0 ? (invitees.map((invitee) => (
                  <Grid key={invitee.id} item sm={6} xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              className={classes.profileImg}
                              src={invitee.user.profileImgPath}
                            />
                            <Typography variant="body1" color="textPrimary">
                              {invitee.user.name}
                            </Typography>
                          </Box>
                        </Box>
                        <Box margin="10px" display="flex" alignItems="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={async () => {
                                if (window.confirm('멤버 초대를 취소하시겠습니까?')) {
                                    const { status } = await RefuseTeam(invitee.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const inviteesResponse
                                        = await GetTeamInvitees(teamId);
                                        if (inviteesResponse.status === 401) {
                                            setIsLogin(false);
                                            return;
                                        }
                                        setInvitees(await inviteesResponse.json());
                                    }
                                }
                            }}
                          >
                            취소
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))) : (<Grid item>초대한 멤버가 없습니다.</Grid>)}
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: '2em' }}>
              <Grid item style={{ margin: '1em 0' }}>
                <Typography variant="h6">팀 신청 멤버</Typography>
              </Grid>
              <Grid container spacing={2}>
                {applicants.length > 0 ? (applicants.map((applicant) => (
                  <Grid key={applicant.id} item sm={6} xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Link
                            to={`/users/${applicant.user.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar
                                className={classes.profileImg}
                                src={applicant.user.profileImgPath}
                              />
                              <Typography variant="body1" color="textPrimary">
                                {applicant.user.name}
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                        <Box margin="10px" display="flex" alignItems="center">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ margin: '0.1em' }}
                            onClick={async () => {
                                if (window.confirm('멤버 신청을 수락하시겠습니까?')) {
                                    const { status } = await AcceptTeam(applicant.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 201) {
                                        const applicantsResponse
                                        = await GetTeamApplcants(teamId);
                                        const membersResponse
                                        = await GetTeamMembers(teamId);

                                        if (applicantsResponse.status === 401
                                            || membersResponse.status === 401) {
                                            setIsLogin(false);
                                            return;
                                        }

                                        setApplicants(await applicantsResponse.json());
                                        setMembers(await membersResponse.json());
                                    }
                                }
                            }}
                          >
                            수락
                          </Button>

                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ margin: '0.1em' }}
                            onClick={async () => {
                                if (window.confirm('멤버 신청을 거절하시겠습니까?')) {
                                    const { status } = await RefuseTeam(applicant.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const applicantsResponse
                                        = await GetTeamApplcants(teamId);

                                        if (applicantsResponse.status === 401) {
                                            return;
                                        }
                                        setApplicants(await applicantsResponse.json());
                                    }
                                }
                            }}
                          >
                            거절
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))) : (<Grid item>가입 신청한 멤버가 없습니다.</Grid>)}
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: '2em' }}>
              <Grid item style={{ margin: '1em 0' }}>
                <Typography variant="h6">팀 멤버</Typography>
              </Grid>
              <Grid container spacing={2}>
                {members.map((member) => (
                  <Grid key={member.id} item sm={6} xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Link
                            to={`/users/${member.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar
                                className={classes.profileImg}
                                src={member.profileImgPath}
                              />
                              <Typography variant="body1" color="textPrimary">
                                {member.name}
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                        <Box margin="10px" display="flex" alignItems="center">
                          {member.id !== team.masterId ? (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={async () => {
                                if (window.confirm('해당 멤버를 추방하시겠습니까?')) {
                                    const { status }
                                    = await KickOutTeamMember(teamId, member.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const teamMembersResponse
                                        = await GetTeamMembers(teamId);

                                        if (teamMembersResponse.status === 401) {
                                            return;
                                        }
                                        setMembers(await teamMembersResponse.json());
                                    }
                                }
                            }}
                            >
                              추방
                            </Button>
            ) : (<></>)}

                        </Box>
                      </Box>
                    </Card>
                  </Grid>
            ))}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6">마스터</Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUserSelectOpen}
                >위임
                </Button>
                <ResponsiveDialog open={openUserSelect} updateOpen={setOpenUserSelect}>
                  <MasterSelect
                    teamId={team.id}
                    currentMaster={[master.id]}
                    setCurrentMaster={setMaster}
                    handleClose={handleUserSelectClose}
                  />
                </ResponsiveDialog>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <Card elevation={2}>
                    <Box display="flex" flexDirection="row">
                      <Box flexGrow={1}>
                        <Link
                          to={`/users/${master.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Box display="flex" alignItems="center">
                            <Avatar
                              className={classes.profileImg}
                              src={master.profileImgPath}
                            />
                            <Typography variant="body1" color="textPrimary">
                              {master.name}
                            </Typography>
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
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
                  onClick={() => {
                    if (window.confirm('팀 내의 내용은 모두 사라집니다. 정말 그래도 삭제하시겠습니까?')) {
                        const { status } = DeleteTeam(teamId);

                        if (status === 401) {
                            setIsLogin(false);
                            return;
                        }

                        if (status === 200) {
                            console.log('성공');
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
