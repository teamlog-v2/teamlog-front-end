import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Postlist } from './post-management/postlist.js'
import { Project } from './project-management/project.js'
import { FriendList } from './post-management/friendlist.js'
import { makeStyles, Button, Menu, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';


import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({

  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
  },
  header: {
    height: '4em',
    paddingTop: '1em',
    textAlign: 'left',
  },
  tags: {
    width: '100%',
    display: 'inline-block',
    textAlign: 'left'
  },
  menu: {
    width: '10%',
    display: 'inline-block',
    textAlign: 'right',
    cursor: 'pointer'
  },
  location: {
    paddingTop: '0.25em',
    paddingBottom: '0.25em',
    cursor: 'pointer'
  },
  postMenu: {
    zIndex: 5
  },
  media: {
    position: 'relative',
    backgroundColor: 'black',
    objectFit: 'contain'
    //모바일 ver, pc ver 높이 필요할 듯        
  },
  content: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    textAlign: 'left'
  },
  files: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'left'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  etc: {
    height: '2.5em',
    marginTop: '0.25em',
    marginBottom: '0.5em',
    textAlign: 'left'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function App() {
  return (
    <div className="App">
      {/* <Postlist/> */}
      <Project></Project>
      {/* <FriendList/> */}
    </div>
  );
}

const Temp = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Yes I Can
              </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.postMenu} >
                <ClickAwayListener onClickAway={handleClose}>
                  <ListItem button>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary = 'Ok...'/>
                  </ListItem>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default App;
