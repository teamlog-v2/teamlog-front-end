import {
  Avatar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext, { setAccessToken } from './contexts/auth';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined, threshold: 0 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Div = ({ children }) => {
  return (
    <>
      <HideOnScroll>
        <div
          style={{
            zIndex: 999,
            // position: 'sticky',
            // top: '0px',
            width: '100%',
            position: 'fixed',
          }}
        >
          <div
            style={{
              margin: '0.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#E0BAF7',
              borderRadius: '0.25rem',
            }}
          >
            {children}
          </div>
        </div>
      </HideOnScroll>
      <div style={{ height: '40px' }} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function AppBar() {
  const classes = useStyles();
  const history = useHistory();

  const [id, setContextId] = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem('access-token');
    setAccessToken('');
    setContextId(null);
    history.push('/');
  };

  if (!id) {
    return (
      <>
        <Div>
          <Button
            color="white"
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인
          </Button>
        </Div>
      </>
    );
  }

  return (
    <>
      <Div>
        <Button onClick={handleClick}>
          <Avatar className={classes.small} />
          <ArrowDropDown />
        </Button>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              history.push(`/users/${id}`);
            }}
          >
            마이페이지
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              history.push('/create-project');
            }}
          >
            프로젝트 생성
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              history.push('/create-team');
            }}
          >
            팀 생성
          </MenuItem>
          <MenuItem>승인 현황</MenuItem>
          <MenuItem
            style={{ color: 'red' }}
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            로그아웃
          </MenuItem>
        </Menu>
      </Div>
    </>
  );
}
