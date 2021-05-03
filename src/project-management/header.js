import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Router, Link} from 'react-router-dom';
import {
  fade,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

const Header = (props) => {
  const classes = useStyles();
  const { sections, title, introduction } = props;
  const [value, setValue] = useState(0);
  // const [response, setResponse] = useState();

  // useEffect(() => {
  //   fetch('/teamlog-api/project/1')
  //   .then(response => response.json())
  //   .then((data) => setResponse(data));
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      </Toolbar>

      <Paper className={classes.root}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
          
            {sections.map((section) => (
                <Tab label={section.title} component={Link} to={section.url}/> 
            ))}
           
          </Tabs>
        </ThemeProvider>
      </Paper>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

Header.defaultProps = {
  sections: [],
  title: PropTypes.string,
};

export default Header;
