import { Button, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import ProjectManagement from '../project-management/projectmanagement';
import ProjectMemberManagement from '../project-management/ProjectMemberManagement';

const RadioButton = ({ children, onClick, highlight, value, ...props }) => (
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
