import { Button, Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import TeamMemberManagement from '../team/TeamMemberManagement';
import TeamManagement from '../team/TeamManagement';

const RadioButton = ({ children, onClick, highlight, value, ...props }) => {
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

const TeamManagementPage = () => {
    const [type, setType] = useState();
    const { id: teamId } = useParams();

    return (
      <>
        <Container maxWidth="md" disableGutters style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Grid container item spacing={2} style={{ margin: '0.5em' }}>
            <Grid item>
              <Link to={`/teams/${teamId}/teammanagement/team`} style={{ textDecoration: 'none' }}>
                <RadioButton
                  highlight="TEAM"
                  value={type}
                >팀 관리
                </RadioButton>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to={`/teams/${teamId}/teammanagement/members`}
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
          <Redirect exact path="/teams/:teamId/teammanagement" to="/teams/:teamId/teammanagement/team" />
          <Route exact path="/teams/:teamId/teammanagement/team">
            <TeamManagement setType={setType} />
          </Route>
          <Route exact path="/teams/:teamId/teammanagement/members">
            <TeamMemberManagement setType={setType} />
          </Route>
        </Switch>
      </>
    );
};

export default TeamManagementPage;
