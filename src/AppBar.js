import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';
import GetAppIcon from '@mui/icons-material/GetApp';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  useScrollTrigger
} from '@mui/material';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContext, { setAccessToken } from './contexts/auth';
import LoginPopup from './global/LoginPopup';
import SignupPopup from './global/SignupPopup';
import ResponsiveDialog from './organisms/ResponsiveDialog';
import ProjectForm from './project/ProjectForm';
import icon from './teamlogIcon_white.png';
import { convertResourceUrl } from './utils';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Wrapper({ children, ...props }) {
  return (
    <>
      <HideOnScroll>
        <Box
          position="fixed"
          top={0}
          zIndex={999}
          width="100%"
          height="48px"
          {...props}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#593875"
        >
          {children}
        </Box>
      </HideOnScroll>
      <Box height="48px" />
    </>
  );
}

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredInstallPrompt = e;
  // Update UI notify the user they can install the PWA
  // Optionally, send analytics event that PWA install promo was shown.
  console.log("'beforeinstallprompt' event was fired.");
});

function accountClickedAddToHome() {
  deferredInstallPrompt?.prompt?.();

  deferredInstallPrompt?.userChoice?.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      // 유저가 홈 스크린에 어플리케이션 추가에 동의
    } else {
      // 유저가 홈 스크린에 어플리케이션 추가를 거부
    }
    deferredInstallPrompt = null;
  });
}

export default function AppBar() {
  const popup = useSelector((state) => state);

  const dispatch = useDispatch();

  const history = useHistory();

  const [id, setContextId, profileImgPath] = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isProjectFormOpened, setIsProjectFormOpened] = useState(false);

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
        {popup === 'login' && <LoginPopup />}
        {popup === 'signup' && <SignupPopup />}
        <Box display="flex" alignItems="center">
          <Wrapper>
            <Title />
            <Box display="flex">
              <IconButton onClick={accountClickedAddToHome}>
                <GetAppIcon style={{ fontSize: '1.125rem', color: 'white' }} />
              </IconButton>
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
                  dispatch({ type: 'login' });
                }}
              >
                로그인
              </Button>
            </Box>
          </Wrapper>
        </Box>
      </>
    );
  }

  return (
    <Box display="flex" alignItems="center">
      <Backdrop open={!!anchorEl} style={{ zIndex: 1001 }} />
      <Wrapper>
        <Title />
        <Box display="flex">
          <IconButton onClick={accountClickedAddToHome}>
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
            <Avatar sx={{
              width: (theme) => theme.spacing(3),
              height: (theme) => theme.spacing(3)
            }}
              src={convertResourceUrl(profileImgPath)}
            />
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
                history.push(`/accounts/${id}`);
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
                history.push(`/accounts/${id}/setting`);
              }}
            >
              프로젝트 관리
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
        </Box>
        <ResponsiveDialog
          open={isProjectFormOpened}
          updateOpen={setIsProjectFormOpened}
        >
          <ProjectForm updateOpen={setIsProjectFormOpened} />
        </ResponsiveDialog>
      </Wrapper>
    </Box>
  );
}

function Title() {
  return (
    <Link to="/main" style={{ color: 'white', marginLeft: '1rem', fontWeight: '300', textDecoration: 'none' }}>
      <Box display="inline-block" style={{ verticalAlign: 'middle' }}>
        <img src={icon} alt="tl" width="33px" height="30px" />
      </Box>
      <Box display="inline-block">TeamLog</Box>
    </Link>
  );
}
