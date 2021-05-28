import {
  Avatar,
  Backdrop,
  Box,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext, { setAccessToken } from './contexts/auth';
import ResponsiveDialog from './organisms/ResponsiveDialog';
import ProjectForm from './project/ProjectForm';
import TeamForm from './team/TeamForm';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 0,
  });

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
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#593875',
              height: '48px',
            }}
          >
            {children}
          </div>
        </div>
      </HideOnScroll>
      <div style={{ height: '48px' }} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredInstallPrompt = e;
  // Update UI notify the user they can install the PWA
  // Optionally, send analytics event that PWA install promo was shown.
  console.log("'beforeinstallprompt' event was fired.");
});

function userClickedAddToHome() {
  deferredInstallPrompt.prompt();

  deferredInstallPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      // 유저가 홈 스크린에 어플리케이션 추가에 동의
    } else {
      // 유저가 홈 스크린에 어플리케이션 추가를 거부
    }
    deferredInstallPrompt = null;
  });
}

export default function AppBar() {
  const classes = useStyles();
  const history = useHistory();

  const [id, setContextId, profileImgPath] = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isProjectFormOpened, setIsProjectFormOpened] = useState(false);
  const [isTeamFormOpened, setIsTeamFormOpened] = useState(false);

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
      <Box display="flex" alignItems="center">
        <Title />
        <Div>
          <IconButton onClick={userClickedAddToHome}>
            <GetAppIcon style={{ fontSize: '1.125rem', color: 'white' }} />
          </IconButton>
          {/* <Button className="add-button" onClick={userClickedAddToHome}>앱</Button> */}
          <IconButton
            onClick={() => {
              history.push('/search');
            }}
          >
            <Search style={{ fontSize: '1rem', color: 'white' }} />
          </IconButton>
          <Button
            style={{ color: 'white' }}
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인
          </Button>
        </Div>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center">
      <Backdrop open={!!anchorEl} style={{ zIndex: 1001 }} />
      <Title />
      <Div>
        <IconButton onClick={userClickedAddToHome}>
          <GetAppIcon style={{ fontSize: '1.125rem', color: 'white' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            history.push('/search');
          }}
        >
          <Search style={{ fontSize: '1.125rem', color: 'white' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            history.push('/news');
          }}
        >
          <Notifications style={{ fontSize: '1.125rem', color: 'white' }} />
        </IconButton>
        <Button onClick={handleClick}>
          <Avatar className={classes.small} src={profileImgPath} />
          <ArrowDropDown style={{ fontSize: '1rem', color: 'white' }} />
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
              setIsProjectFormOpened(true);
              // history.push('/create-project');
            }}
          >
            프로젝트 생성
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setIsTeamFormOpened(true);
              // history.push('/create-team');
            }}
          >
            팀 생성
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              history.push(`/users/${id}/setting`);
              // /users/${id}/setting
            }}
          >
            팀 / 프로젝트 설정
          </MenuItem>
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
        <ResponsiveDialog
          open={isProjectFormOpened}
          updateOpen={setIsProjectFormOpened}
        >
          <ProjectForm updateOpen={setIsProjectFormOpened} />
        </ResponsiveDialog>
        <ResponsiveDialog
          open={isTeamFormOpened}
          updateOpen={setIsTeamFormOpened}
        >
          <TeamForm updateOpen={setIsTeamFormOpened} />
        </ResponsiveDialog>
      </Div>
    </Box>
  );
}

// ////////
function Title() {
  return (
    <Link
      to="/main"
      style={{ zIndex: 1000, color: 'white', marginLeft: '1rem' }}
    >
      <Typography>TeamLog</Typography>
    </Link>
  );
}
