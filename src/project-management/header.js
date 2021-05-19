import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  fade,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Grid } from '@material-ui/core';
import { useFetchData } from '../hooks/hooks';
import ErrorContext from '../contexts/error';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '20%',
    fontSize: '1.25em',
    flexShrink: 0,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
  },
}));

const ProjectTitle = (props) => {
  const classes = useStyles();
  const { title, introduction } = props;

  return (
    <Box width="100%">
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="left"
        noWrap
        className={classes.toolbarTitle}
      >
        {title}
      </Typography>
      <Typography component="div">{introduction}</Typography>
    </Box>
  );
};

const Header = ({ sections }) => {
  const { id: projectId } = useParams();
  const { pathname } = useLocation();

  const [project, isProjectLoaded, projectLoadError] = useFetchData(`/api/projects/${projectId}`);
  console.log(isProjectLoaded);
  const title = project?.name;
  const introduction = project?.introduction;

  const { useHandleError } = useContext(ErrorContext);
  useHandleError(projectLoadError);

  const selectedTabIndex = sections.findIndex(
    (section) => pathname === `/projects/${projectId}${section.url}`,
  );

  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(195, 0, 255)',
      },
    },
  });

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <ProjectTitle title={title} introduction={introduction} />
        <Grid item style={{ margin: '1em 0' }} xs={2} sm={1}>
          <Link
            to={`/projects/${projectId}/projectmanagement`}
            style={{ textDecoration: 'none' }}
          >
            <Button>
              <SettingsIcon color="action" />
            </Button>
          </Link>
        </Grid>
      </Toolbar>

      <Paper className={classes.root}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={selectedTabIndex}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {sections.map((section, index) => (
              <Tab
                key={index}
                label={section.title}
                component={Link}
                to={`/projects/${projectId}${section.url}`}
              />
            ))}
          </Tabs>
        </ThemeProvider>
      </Paper>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.arrayOf,
};

Header.defaultProps = {
  sections: [],
};

export default Header;
