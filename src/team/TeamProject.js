import { Container, Fab, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProjectForm from '../project/ProjectForm';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import TeamProjectsContainer from './TeamProjectsContainer';

const useStyles = makeStyles((theme) => ({
  /* 반응형 스타일 */
  button: {
    position: 'fixed',
    zIndex: 3,
    [theme.breakpoints.up('xs')]: {
      right: 0,
      bottom: 0,
      margin: '2%',
    },
    [theme.breakpoints.up('md')]: {
      left: '75%',
      top: '85%',
    },
  },
}));

const TeamProject = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
    return (
      <Container maxWidth="md" style={{ marginTop: '1em' }}>
        <Grid container>
          <TeamProjectsContainer teamId={id} />
        </Grid>
        <Fab
          className={classes.button}
          color="primary"
          onClick={() => { setOpen(true); }}
        >
          <AddIcon />
        </Fab>
        <ResponsiveDialog open={open} updateOpen={setOpen}>
          <ProjectForm />
        </ResponsiveDialog>
      </Container>
    );
};

export default TeamProject;
