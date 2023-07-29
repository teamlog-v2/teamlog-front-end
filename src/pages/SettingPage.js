import { Button, Container, Divider, Grid, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import TeamSetting from '../team/TeamSetting';
import ProjectSetting from '../project-management/ProjectSetting';
import AuthContext from '../contexts/auth';

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

const SettingPage = () => {
    const [type, setType] = useState('TEAM'); // TEAM or PROJECT
    const [userId] = useContext(AuthContext);

    return (
      <Container disableGutters maxWidth="md">
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" style={{ margin: '0.5em 0.5em 0.5em' }}>
              ⚙️팀 / 프로젝트 설정
            </Typography>
          </Grid>
          <Divider />
          <Container disableGutters maxWidth="md">
            <Grid container item spacing={2} style={{ margin: '0.5em' }}>
              <Grid item>
                <Link to={`/accounts/${userId}/setting/teams`} style={{ textDecoration: 'none' }}>
                  <RadioButton
                    highlight="TEAM"
                    value={type}
                    onClick={() => {
                    setType('TEAM');
                }}
                  >팀 설정
                  </RadioButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/accounts/${userId}/setting/projects`} style={{ textDecoration: 'none' }}>
                  <RadioButton
                    highlight="PROJECT"
                    value={type}
                    onClick={() => {
                  setType('PROJECT');
              }}
                  >프로젝트 설정
                  </RadioButton>
                </Link>
              </Grid>
            </Grid>
          </Container>
          <Switch>
            <Redirect exact path="/accounts/:userId/setting" to="/accounts/:userId/setting/teams" />
            <Route exact path="/accounts/:userId/setting/teams" component={TeamSetting} />
            <Route exact path="/accounts/:userId/setting/projects" component={ProjectSetting} />
          </Switch>
        </Grid>
      </Container>
    );
};

export default SettingPage;
