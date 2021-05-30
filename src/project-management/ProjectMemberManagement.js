import { Avatar, Box, Button, Card, CircularProgress, Container, Divider, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, Link, Redirect, useParams } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import ProjectUpdateForm from '../project/ProjectUpdateForm';
import Introduction from './introduction';
import InviteesSelect from './inviteesSelect';
import MasterSelect from './masterSelect';
import { AcceptProject, DeleteProject, GetProject, GetProjectApplcants, GetProjectInvitees, GetProjectMembers, KickOutProjectMember, RefuseProject } from './projectapi';

const useStyles = makeStyles(() => ({
    profileImg: {
      margin: '10px',
      width: '60px',
      height: '60px',
    },
}));

const ProjectMemberManagement = (props) => {
    const { projectId } = useParams();
    const { setType } = props;
    setType('MEMBER');
    const [userId] = useContext(AuthContext); // 유저 정보

    const classes = useStyles();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [openUserSelect, setOpenUserSelect] = useState(false); // 마스터 선택 폼 띄울지 여부
    const [openInviteeSelect, setOpenInviteeSelect] = useState(false);

    const [master, setMaster] = useState([]); // 마스터
    const [members, setMembers] = useState([]); // 멤버
    const [project, setProject] = useState(); // 프로젝트
    const [invitees, setInvitees] = useState([]); // 초대받은 유저
    const [applicants, setApplicants] = useState([]); // 신청한 유저

    useEffect(async () => {
        const projectResponse = await GetProject(projectId);
        const applicantsResponse = await GetProjectApplcants(projectId);
        const inviteesResponse = await GetProjectInvitees(projectId);
        const membersResponse = await GetProjectMembers(projectId);

        if (projectResponse.status === 401
            || applicantsResponse.status === 401
            || membersResponse.status === 401) {
            setIsLogin(false);
            return;
        }

        const tempMembers = await membersResponse.json();
        const tempProject = await projectResponse.json();
        const tempApplicants = await applicantsResponse.json();
        const tempInvitees = await inviteesResponse.json();

        if (userId !== tempProject.masterId) {
          window.alert('접근 권한이 없습니다.');
          window.location.replace(`/projects/${projectId}`);
          return;
        }

        setProject(tempProject);
        setMembers(tempMembers);
        setApplicants(tempApplicants);
        setInvitees(tempInvitees);

        const tempMaster = tempMembers.filter((user) => user.id === tempProject.masterId);
        setMaster(tempMaster[0]);
        setIsLoaded(true);
    }, []);

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

    if (!isLogin) {
        return <Redirect to="/login" />;
    }

    if (!isLoaded) {
        return (
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
              <Typography> 프로젝트 멤버 관리 페이지를 불러오고 있어요! </Typography>
            </Grid>
          </Grid>
        );
    }

    return (
      <Container maxWidth="md">
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
                projectId={projectId}
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
                                    const { status } = await RefuseProject(invitee.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const inviteesResponse
                                        = await GetProjectInvitees(projectId);
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
            <Typography variant="h6">프로젝트 신청 멤버</Typography>
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
                                    const { status } = await AcceptProject(applicant.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 201) {
                                        const applicantsResponse
                                        = await GetProjectApplcants(projectId);
                                        const membersResponse
                                        = await GetProjectMembers(projectId);

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
                                    const { status } = await RefuseProject(applicant.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const applicantsResponse
                                        = await GetProjectApplcants(projectId);

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
            <Typography variant="h6">프로젝트 멤버</Typography>
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
                      {member.id !== project.masterId ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={async () => {
                                if (window.confirm('해당 멤버를 추방하시겠습니까?')) {
                                    const { status }
                                    = await KickOutProjectMember(projectId, member.id);
                                    if (status === 401) {
                                        setIsLogin(false);
                                        return;
                                    }

                                    if (status === 200) {
                                        const projectMembersResponse
                                        = await GetProjectMembers(projectId);

                                        if (projectMembersResponse.status === 401) {
                                            return;
                                        }
                                        setMembers(await projectMembersResponse.json());
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
                projectId={project.id}
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
      </Container>
);
};

export default ProjectMemberManagement;
