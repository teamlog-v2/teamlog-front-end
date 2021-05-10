import { Button, ListItemIcon, ListItemText, Container, MenuItem, MenuList, Box, Avatar } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import {
  React,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  createMuiTheme,
    makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { getProjectMembers } from '../project-management/projectapi';
import { CreateComment } from './commentapi';

const useStyles = makeStyles(() => ({
    more: {
      marginLeft: '0.25em',
      color: 'rgb(180, 180, 180)',
      paddingTop: '0.5em',
      paddingBottom: '0.5em',
      cursor: 'pointer',
    },
    comment: {
      backgroundColor: 'rgb(245, 245, 245)',
      textAlign: 'left',
    },
    reply: {
      // display='inline-block' right='0px' width='10%' textAlign='right'
      display: 'inline-block',
      right: '0px',
      width: '10%',
      textAlign: 'right',
    },
    icon: {
      cursor: 'pointer',
      width: 'auto',
      display: 'inline-block',
      margin: '0.5em',
    },
    friends: {
      width: '20em',
      height: '25em',
      zIndex: '500',
      overflow: 'auto',
    },
    replyTarget: {
      marginLeft: '0.25em',
      padding: '0.25em',
    },
    closeReply: {
      display: 'inline-block',
      right: '1em',
      cursor: 'pointer',
    },
  }));

const CommentForm = (props) => {
    const classes = useStyles();
    const {
      /* options, */ postId,
      projectId,
      parentCommentId,
      renewCommentList,
    } = props;
    const [options, setOptions] = useState([]);

    useEffect(async () => {
      setOptions(await getProjectMembers(projectId));
    }, []);

    const [state, setState] = useState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: '',
      tagStartIndex: -1,
    });

    const inputRef = useRef();
    const [menuFocus, setMenuFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const onKeyDown = (e) => {
      // 위 화살표 or 아래 화살표
      if ((state.showOptions && e.keyCode === 38) || e.keyCode === 40) {
        setMenuFocus(true);
      }
    };

    // 커서 위치에 따른 멘션 시작점 설정용
    const onSelect = () => {
      const index = inputRef.current.selectionStart;

      setMenuFocus(false);

      if (state.userInput.charAt(index - 2) === '@') {
        setState({
          ...state,
          tagStartIndex: index - 2,
        });
      }
    };

    // 입력할 때
    const onChange = (e) => {
      const userCurrentInput = e.currentTarget.value;

      setState({
        ...state,
        userInput: e.currentTarget.value,
      });

      if (
        state.tagStartIndex > -1
        && userCurrentInput.charAt(state.tagStartIndex) === '@'
      ) {
        const splitName = userCurrentInput.substring(
          state.tagStartIndex + 1,
          inputRef.current.selectionStart,
        );

        if (splitName.length === 0) return;

        const filteredOptions = options.filter(
          (option) => option.id.toLowerCase().indexOf(splitName.toLowerCase()) > -1
            || option.name.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
        );

        setState({
          ...state,
          activeOption: 0,
          filteredOptions,
          showOptions: true,
          userInput: e.currentTarget.value,
        });

        if (filteredOptions.length > 0) {
          setOpen(true);
          setAnchorEl(e.currentTarget);
        } else {
          setOpen(false);
          setAnchorEl(null);
        }
      } else {
        setOpen(false);
        setAnchorEl(null);

        setState({
          ...state,
          activeOption: 0,
          filteredOptions: [],
          showOptions: false,
          userInput: e.currentTarget.value,
        });
      }
    };

    // 특정 유저 선택시
    const onClick = (e) => {
      setOpen(false);
      setAnchorEl(null);

      const target = e.currentTarget.dataset.myValue;

      const startStr = state.userInput.substring(0, state.tagStartIndex);
      const midStr = `@${target} `;
      const lastStr = state.userInput.substring(
        inputRef.current.selectionStart,
        state.userInput.length,
      );

      setState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: startStr + midStr + lastStr,
        tagStartIndex: -1,
      });

      setMenuFocus(false);

      inputRef.current.focus();
    };

    // 댓글 등록 시 언급된 사용자 골라내기
    const setSelectedUser = (commentContent) => {
      const mentionSplitList = commentContent.split('@');
      const selectedUserList = [];

      for (let i = 0; i < mentionSplitList.length; i += 1) {
        const userSplit = mentionSplitList[i].split(' ')[0];

        const filteredUser = options.filter(
          (option) => option.id.toLowerCase() === userSplit.toLowerCase(),
        );

        if (
          filteredUser.length === 1
          && !selectedUserList.includes(filteredUser[0].id)
        ) {
          selectedUserList.push(filteredUser[0].id);
        }
      }

      return selectedUserList;
    };

    const handleClose = () => {
      setOpen(false);
    };

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: 'rgb(220, 220, 220)',
        },
      },
    });

    return (
      <Container>
        <Box
          component="form"
          marginTop="1em"
          marginBottom="1em"
          width="auto"
          height="auto"
        >
          <Box width="80%" display="inline-block">
            <>
              <InputBase
                name="reply"
                className={classes.input}
                placeholder="댓글을 입력하세요."
                multiline
                fullWidth
                inputRef={inputRef}
                onChange={onChange}
                value={state.userInput}
                onSelect={onSelect}
                onKeyDown={onKeyDown}
              />
            </>
          </Box>
          <Box width="20%" display="inline-block">
            <ThemeProvider theme={theme}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={async () => {
                  await CreateComment(
                    parentCommentId,
                    postId,
                    inputRef.current.value,
                    setSelectedUser(inputRef.current.value),
                  );
                  setState({ ...state, userInput: '' });
                  renewCommentList();
                }}
              >
                작성
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
        <Popper
          open={open}
          disablePortal
          style={{ zIndex: 1 }}
          anchorEl={anchorEl}
          placement="top-start"
          role={undefined}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper className={classes.postMenu}>
                <ClickAwayListener onClickAway={handleClose}>
                  <FriendList
                    autoFocus={menuFocus}
                    options={state.filteredOptions}
                    onClick={onClick}
                  />
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Container>
    );
  };

  const FriendList = (props) => {
    const classes = useStyles();
    const { options, onClick, autoFocus } = props;

    return (
      <Container disableGutters>
        <Box className={classes.friends}>
          <MenuList autoFocusItem={autoFocus} variant="selectedMenu">
            {options
              ? options.map((item) => (
                <MenuItem
                  button
                  className="option-active"
                  key={item}
                  data-my-value={item.id}
                  onClick={onClick}
                >
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </MenuItem>
                ))
              : null}
          </MenuList>
        </Box>
      </Container>
    );
  };

  export default CommentForm;