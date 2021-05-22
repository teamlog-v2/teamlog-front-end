import { React, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useLocation, Redirect } from 'react-router-dom';
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
import { Button } from '@material-ui/core';
import { useFetchData } from '../hooks/hooks';
import ErrorContext from '../contexts/error';
// import { AcceptTeam, ApplyTeam } from './teamapi';

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

const TeamTitle = (props) => {
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

const TopButton = ({ isTeamLoaded, teamId, relation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [relationState, setRelationState] = useState();

  useEffect(() => {
    setRelationState(relation);
  }, [isTeamLoaded]);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  const Apply = async () => {
    // const response = await ApplyTeam(teamId);

    // if (response.status === 401) {
    //   setIsLogin(false);
    //   return;
    // }

    // if (response.status === 201) {
    //   setRelationState('APPLIED');
    // }
  };

  const Accept = async () => {
    // const response = await AcceptTeam(teamId);

    // if (response.status === 401) {
    //   setIsLogin(false);
    //   return;
    // }

    // if (response.status === 200) {
    //   setRelationState('MEMBER');
    // }
  };

  // 초대 수락의 경우 join id까지 필요할 듯...?
  switch (relationState) {
    case 'MASTER':
      return (
        <Link
          to={`/teams/${teamId}/teammanagement`}
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
  const { id: teamId } = useParams();
  const { pathname } = useLocation();

  const [team, isTeamLoaded, teamLoadError] = useFetchData(`/api/teams/${teamId}`);
  console.log(team);
  const title = team?.name;
  const introduction = team?.introduction;
  const relation = team?.relation;

  updateRelation(team?.relation ?? 'NONE');

  const { useHandleError } = useContext(ErrorContext);
  useHandleError(teamLoadError);

  const selectedTabIndex = sections.findIndex(
    (section) => pathname === `/teams/${teamId}${section.url}`,
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
        <TeamTitle title={title} introduction={introduction} />
        <TopButton teamId={teamId} isTeamLoaded={isTeamLoaded} relation={relation} />
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
                to={`/teams/${teamId}${section.url}`}
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
