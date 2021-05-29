import { Avatar, Box, Button, Card, CircularProgress, Container, Divider, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';
import { Switch, Link } from 'react-router-dom';
import { GetProject, GetProjectMembers, GetProjectApplcants, GetProjectInvitees, AcceptProject, RefuseProject, DeleteProject, KickOutProjectMember } from '../project-management/projectapi';
import Introduction from '../project-management/introduction';
import MasterSelect from '../project-management/masterSelect';
import InviteesSelect from '../project-management/inviteesSelect';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import AuthContext from '../contexts/auth';
import ProjectUpdateForm from '../project/ProjectUpdateForm';
import ProjectMemberManagement from '../project-management/ProjectMemberManagement';
import ProjectManagement from '../project-management/projectmanagement';

const RadioButton = ({ children, onClick, highlight, value, ...props }) => {
  console.log(value);
  // console.log(highlight);
  return (
    <Button
      fullWidth
      variant={highlight === value ? 'contained' : 'outlined'}
      onClick={onClick}
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

const ProjectManagementPage = () => {
    const [type, setType] = useState();
    const { id: projectId } = useParams();

    return (
      <>
        <Container maxWidth="md" disableGutters style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Grid container item spacing={2} style={{ margin: '0.5em' }}>
            <Grid item>
              <Link to={`/projects/${projectId}/projectmanagement/project`} style={{ textDecoration: 'none' }}>
                <RadioButton
                  highlight="PROJECT"
                  value={type}
                >프로젝트 관리
                </RadioButton>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to={`/projects/${projectId}/projectmanagement/members`}
                style={{ textDecoration: 'none' }}
              >
                <RadioButton
                  highlight="MEMBER"
                  value={type}
                >멤버 관리
                </RadioButton>
              </Link>
            </Grid>
          </Grid>
        </Container>
        <Switch>
          <Redirect exact path="/projects/:projectId/projectmanagement" to="/projects/:projectId/projectmanagement/project" />
          <Route exact path="/projects/:projectId/projectmanagement/project">
            <ProjectManagement setType={setType} />
          </Route>
          <Route exact path="/projects/:projectId/projectmanagement/members">
            <ProjectMemberManagement setType={setType} />
          </Route>
        </Switch>
      </>
    );
};

export default ProjectManagementPage;
