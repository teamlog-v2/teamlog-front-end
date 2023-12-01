import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import ProjectSetting from '../project-management/ProjectSetting';

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

const SettingPage = () => {
    const [type, setType] = useState('TEAM'); // TEAM or PROJECT
    const [userId] = useContext(AuthContext);

    return (
      <Container disableGutters maxWidth="md">
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" style={{ margin: '0.5em 0.5em 0.5em' }}>
              ⚙️ 프로젝트 설정
            </Typography>
          </Grid>
          <Divider />
          <Container disableGutters maxWidth="md">
            <Grid container item spacing={2} style={{ margin: '0.5em' }}>
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
            <Route exact path="/accounts/:userId/setting/projects" component={ProjectSetting} />
          </Switch>
        </Grid>
      </Container>
    );
};

export default SettingPage;
