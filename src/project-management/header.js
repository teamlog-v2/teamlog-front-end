import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button, Grid,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
  alpha,
} from '@mui/material';

import { createTheme } from '@mui/material/styles'; // Import from '@mui/material/styles'
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';
import { ApplyProject, InvitationAccept } from './project-api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    <Box width="100%" style={{ padding: '2% 0' }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="left"
        noWrap
        className={classes.toolbarTitle}
      >
        <strong>{title}</strong>
      </Typography>
      <Typography component="div">{introduction}</Typography>
    </Box>
  );
};

const TopButton = ({ isProjectLoaded, projectId, relation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [relationState, setRelationState] = useState();

  useEffect(() => {
    setRelationState(relation);
  }, [isProjectLoaded]);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  const Apply = async () => {
    const response = await ApplyProject(projectId);

    if (response.status === 401) {
      setIsLogin(false);
      return;
    }

    if (response.status === 201) {
      setRelationState('APPLIED');
    }
  };

  const Accept = async () => {
    const response = await InvitationAccept(projectId);

    if (response.status === 401) {
      setIsLogin(false);
      return;
    }

    if (response.status === 201) {
      setRelationState('MEMBER');
    }
  };

  switch (relationState) {
    case 'MASTER':
      return (
        <Link
          to={`/projects/${projectId}/projectmanagement`}
          style={{ textDecoration: 'none' }}
        >
          <Button>
            <SettingsIcon color="action" />
          </Button>
        </Link>
      );
    case 'INVITED':
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={Accept}
          style={{ maxWidth: '7em', minWidth: '7em' }}
        >초대 수락
        </Button>
      );
    case 'APPLIED':
      return (
        <Button
          variant="outlined"
          color="primary"
          disabled
          style={{ maxWidth: '7em', minWidth: '7em' }}
        >신청 완료
        </Button>
      );
    case 'NONE':
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={Apply}
          style={{ maxWidth: '7em', minWidth: '7em' }}
        >가입 신청
        </Button>
      );
    default:
      return (<></>);
  }
};

const Header = ({ sections, updateRelation }) => {
  const { id: projectId } = useParams();
  const { pathname } = useLocation();

  const [project, isProjectLoaded, projectLoadError] = useFetchData(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`);
  const title = project?.name;
  const introduction = project?.introduction;
  const relation = project?.relation;

  updateRelation(project?.relation ?? 'NONE');

  const [accountId] = useContext(AuthContext);
  const { useHandleError } = useContext(ErrorContext);
  useHandleError(projectLoadError);

  const selectedTabIndex = sections.findIndex(
    (section) => pathname === `/projects/${projectId}${section.url}`,
  );

  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#593875',
      },
    },
  });

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Grid container>
          <Grid item xs={10} sm={11}>
            <ProjectTitle title={title} introduction={introduction} />
          </Grid>
          <Grid container item xs={2} sm={1} justify="center" alignItems="center">
            {accountId === null ?
              (<></>) :
              (<TopButton projectId={projectId} isProjectLoaded={isProjectLoaded} relation={relation} />)}
          </Grid>
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
