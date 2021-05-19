import { Avatar, Box, Button, Card, CircularProgress, Container, Divider, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { GetProject, GetProjectMembers, GetProjectApplcants, GetProjectInvitees } from './projectapi';
import Introduction from './introduction';

const useStyles = makeStyles(() => ({
    profileImg: {
      margin: '10px',
      width: '60px',
      height: '60px',
    },
}));

const ProjectManagement = ({ match }) => {
    const classes = useStyles();
    const projectId = match.params.id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [project, setProject] = useState(); // 프로젝트 정보
    const [members, setMembers] = useState([]); // 멤버 정보
    const [applicants, setApplicants] = useState([]);
    const [invitees, setInvitees] = useState([]);
    useEffect(async () => {
        const projectResponse = await GetProject(projectId);
        const applicantsResponse = await GetProjectApplcants(projectId);
        const inviteesResponse = await GetProjectInvitees(projectId);
        const membersResponse = await GetProjectMembers(projectId);

        if (projectResponse.status === 401
            || applicantsResponse.status === 401
            || membersResponse.status === 401) {
                // 세션 만료. 로그인 화면으로 돌아가라!
            return;
        }

        setProject(await projectResponse.json());
        setMembers(await membersResponse.json());
        setApplicants(await applicantsResponse.json());
        setInvitees(await inviteesResponse.json());
        setIsLoaded(true);
    }, []);

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
          <Typography> 프로젝트 설정 페이지를 불러오고 있어요! </Typography>
        </Grid>
      </Grid>
    ) : (
      <>
        <Container maxWidth="md" style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Container>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6">프로젝트 정보</Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >수정
                </Button>
              </Grid>
              <Grid item>
                <Introduction
                  masterUserId={project.masterId}
                  createTime={project.createTime}
                  followerCount={project.followerCount}
                  memberCount={project.memberCount}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }}>
                <Typography variant="h6">초대한 멤버</Typography>
              </Grid>
              <Grid container spacing={2}>
                {invitees.map((invitee) => (
                  <Grid key={invitee.id} item sm={6} xs={12}>
                    <Card elevation={2}>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                          <Link
                            to={`/users/${invitee.user.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar
                                className={classes.profileImg}
                                src={invitee.user.profileImgPath}
                              />
                              <Typography variant="body1" color="textPrimary">
                                {invitee.user.name}
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                        <Box margin="10px" display="flex" alignItems="center">
                          <Button>
                            <CloseIcon color="action" />
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
            ))}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }}>
                <Typography variant="h6">프로젝트 신청 멤버</Typography>
              </Grid>
              <Grid container spacing={2}>
                {applicants.map((applicant) => (
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
                          <Button>
                            <CloseIcon color="action" />
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
            ))}
              </Grid>
            </Grid>
            <Grid container>
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
                          <Button>
                            <CloseIcon color="action" />
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
            ))}
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: '2em' }}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
                <Typography variant="h6" style={{ color: 'red' }}>
                  프로젝트 삭제
                </Typography>
              </Grid>
              <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >삭제
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </>
);
};

export default ProjectManagement;
