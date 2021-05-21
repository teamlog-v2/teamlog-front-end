import {
  Avatar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext, { setAccessToken } from './contexts/auth';

const Div = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '8px 8px 0px 8px',
        backgroundColor: '#E0BAF7',
        borderRadius: '0.25rem',
      }}
    >
      {children}
    </div>
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
    );
  }

  return (
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
  );
}
